import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;


  // Swagger definition
  const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "FinanceHub API",
        version: "1.0.0",
        description: "API documentation for the FinanceHub application. This API provides endpoints for managing transactions and user profiles.",
      },
servers: [
  {
    url: process.env.NODE_ENV === "production"
      ? "https://financehub-sacy.onrender.com"
      : "http://localhost:3000",
    description: process.env.NODE_ENV === "production"
      ? "Production server"
      : "Development server",
  },
],
    },
    apis: ["./server.ts"], // Path to the API docs
  };

  const swaggerDocs = swaggerJsdoc(swaggerOptions);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
  explorer: true,
}));

  /**
   * @openapi
   * /api/health:
   *   get:
   *     description: Returns the health status of the API.
   *     responses:
   *       200:
   *         description: Returns a JSON object indicating the status.
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
    res.json({ status: "ok" });
  });

  /**
   * @openapi
   * /api/transactions:
   *   get:
   *     description: Get a list of recent transactions (Mock).
   *     responses:
   *       200:
   *         description: A list of transactions.
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
   */
  app.get("/api/transactions", (req, res) => {
    res.json([
      { id: "1", amount: 100, type: "income", category: "Salary" },
      { id: "2", amount: 50, type: "expense", category: "Food" },
    ]);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
  });
}

startServer();
