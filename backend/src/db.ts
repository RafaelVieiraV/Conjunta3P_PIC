import type {} from "node:fs";
// backend/src/db.js
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

// Crear el pool de conexión a PostgreSQL
export const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
});

// Probar conexión al iniciar
(async () => {
  try {
    await pool.query("SELECT NOW()");
    console.log("📦 Conectado a la base de datos PostgreSQL");
  } catch (error) {
    console.error("❌ Error de conexión a la base de datos:", error.message);
    process.exit(1);
  }
})();
