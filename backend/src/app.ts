// backend/src/app.js
import express from "express";
import cors from "cors";
import { pool } from "./db.js";
import dotenv from "dotenv";

import investigadoresRoutes from "./routes/investigadores.routes.js";
import lineasRoutes from "./routes/lineas.routes.js";
import disponibilidadesRoutes from "./routes/disponibilidades.routes.js";
import asignacionesRoutes from "./routes/asignaciones.routes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ mensaje: "API Investigadores funcionando 🚀" });
});

/* =======================
   EJEMPLOS DE ENDPOINTS
======================= */

// Crear investigador
app.post("/investigadores", async (req, res) => {
  try {
    const { nombre, apellido, departamento, experiencia } = req.body;
    const query = `
      INSERT INTO investigador(nombre, apellido, departamento, experiencia)
      VALUES ($1, $2, $3, $4) RETURNING *`;
    const { rows } = await pool.query(query, [
      nombre,
      apellido,
      departamento,
      experiencia,
    ]);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error("Error al crear investigador:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Listar investigadores
app.get("/investigadores", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM investigador ORDER BY id");
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener investigadores:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Asignación (esto dispara el trigger en BD para agrupar)
app.post("/asignaciones", async (req, res) => {
  try {
    const { investigador_id, linea_id, disponibilidad_id } = req.body;
    const query = `
      INSERT INTO investigador_linea_disponibilidad(investigador_id, linea_id, disponibilidad_id)
      VALUES ($1, $2, $3) RETURNING *`;
    const { rows } = await pool.query(query, [
      investigador_id,
      linea_id,
      disponibilidad_id,
    ]);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error("Error al asignar investigador:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Listar grupos con miembros y datos completos
app.get("/grupos", async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT 
        g.id, g.nombre, g.linea_id, g.disponibilidad_id, g.created_at,
        l.nombre AS linea_nombre,
        d.franja_horaria AS disponibilidad_franja,
        d.modalidad AS disponibilidad_modalidad,
        json_agg(json_build_object(
          'id', i.id,
          'nombre', i.nombre,
          'apellido', i.apellido
        )) AS miembros
      FROM grupo g
      JOIN linea_investigacion l ON l.id = g.linea_id
      JOIN disponibilidad d ON d.id = g.disponibilidad_id
      LEFT JOIN grupo_miembro gm ON gm.grupo_id = g.id
      LEFT JOIN investigador i ON i.id = gm.investigador_id
      GROUP BY g.id, l.nombre, d.franja_horaria, d.modalidad
      ORDER BY g.created_at DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener grupos:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

/* =======================
   USO DE RUTAS IMPORTADAS
======================= */
app.use("/investigadores", investigadoresRoutes);
app.use("/lineas", lineasRoutes);
app.use("/disponibilidades", disponibilidadesRoutes);
app.use("/asignaciones", asignacionesRoutes);

/* =======================
   INICIAR SERVIDOR
======================= */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend escuchando en http://localhost:${PORT}`);
});
