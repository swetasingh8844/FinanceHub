import express from "express";
import cors from "cors";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import admin from "firebase-admin";
import { readFileSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Firebase Admin
let db: admin.firestore.Firestore;

try {
  if (process.env.NODE_ENV === "production" && process.env.FIREBASE_SERVICE_ACCOUNT) {
    // On Render: use environment variable
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: `https://financehub-3dc32.firebaseio.com`,
    });
  } else {
    // Locally: use serviceAccountKey.json file
    const serviceAccount = JSON.parse(readFileSync("./serviceAccountKey.json", "utf-8"));
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  db = admin.firestore();
  db.settings({ databaseId: "ai-studio-8133af41-f711-4352-87d2-f9992ce5f204" });
  console.log("Firebase Admin initialized successfully");
} catch (error) {
  console.error("Firebase Admin initialization error:", error);
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // ✅ CORS FIRST - before all routes
  app.use(cors({
    origin: [
      "http://localhost:3000",
      "https://financehub-3dc32.web.app",
      "https://financehub-3dc32.firebaseapp.com",
      "https://financehub-sacy.onrender.com",
      "https://financehubservice.onrender.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }));

  app.use(express.json());

  // Swagger definition
  const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "FinanceHub API",
        version: "1.0.0",
        description: "API documentation for the FinanceHub application. Provides endpoints for managing transactions and user profiles.",
      },
      servers: [
        {
          url: process.env.NODE_ENV === "production"
            ? "https://financehubservice.onrender.com"
            : "http://localhost:3000",
          description: process.env.NODE_ENV === "production"
            ? "Production server"
            : "Development server",
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
    },
    apis: ["./server.ts"],
  };

  const swaggerDocs = swaggerJsdoc(swaggerOptions);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs, { explorer: true }));

  // Auth middleware - verifies Firebase token
  const verifyToken = async (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized - No token provided" });
    }
    try {
      const token = authHeader.split("Bearer ")[1];
      const decoded = await admin.auth().verifyIdToken(token);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }
  };

  /**
   * @openapi
   * /api/health:
   *   get:
   *     summary: Health check
   *     description: Returns the health status of the API.
   *     responses:
   *       200:
   *         description: API is running
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   example: ok
   */
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  /**
   * @openapi
   * /api/transactions:
   *   get:
   *     summary: Get all transactions
   *     description: Returns real-time transactions from Firestore. Requires authentication.
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: A list of transactions
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: string
   *                   amount:
   *                     type: number
   *                   type:
   *                     type: string
   *                     enum: [income, expense]
   *                   category:
   *                     type: string
   *                   description:
   *                     type: string
   *                   date:
   *                     type: string
   *                   createdBy:
   *                     type: string
   *       401:
   *         description: Unauthorized
   */
  app.get("/api/transactions", verifyToken, async (req, res) => {
    try {
      const snapshot = await db.collection("transactions").orderBy("date", "desc").limit(50).get();
      const transactions = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date?.toDate?.()?.toISOString() || doc.data().date,
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt,
      }));
      res.json(transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      res.status(500).json({ error: "Failed to fetch transactions" });
    }
  });

  /**
   * @openapi
   * /api/users:
   *   get:
   *     summary: Get all users
   *     description: Returns all users from Firestore. Requires admin authentication.
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: A list of users
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   uid:
   *                     type: string
   *                   email:
   *                     type: string
   *                   displayName:
   *                     type: string
   *                   role:
   *                     type: string
   *                     enum: [admin, analyst, viewer]
   *                   status:
   *                     type: string
   *                     enum: [active, inactive]
   *       401:
   *         description: Unauthorized
   */
  app.get("/api/users", verifyToken, async (req, res) => {
    try {
      const snapshot = await db.collection("users").get();
      const users = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt,
      }));
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });

  /**
   * @openapi
   * /api/transactions:
   *   post:
   *     summary: Create a transaction
   *     description: Creates a new transaction in Firestore. Requires authentication.
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [amount, type, category, date]
   *             properties:
   *               amount:
   *                 type: number
   *               type:
   *                 type: string
   *                 enum: [income, expense]
   *               category:
   *                 type: string
   *               description:
   *                 type: string
   *               date:
   *                 type: string
   *     responses:
   *       201:
   *         description: Transaction created
   *       401:
   *         description: Unauthorized
   */
  app.post("/api/transactions", verifyToken, async (req: any, res) => {
    try {
      const { amount, type, category, description, date } = req.body;
      const newTransaction = {
        amount,
        type,
        category,
        description: description || "",
        date: admin.firestore.Timestamp.fromDate(new Date(date)),
        createdBy: req.user.uid,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      };
      const docRef = await db.collection("transactions").add(newTransaction);
      res.status(201).json({ id: docRef.id, ...newTransaction });
    } catch (error) {
      console.error("Error creating transaction:", error);
      res.status(500).json({ error: "Failed to create transaction" });
    }
  });

  // Vite middleware for development / static for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
  });
}

startServer();