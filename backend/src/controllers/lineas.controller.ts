import type { Request, Response } from "express";
import { pool } from "../db.js";

export const getLineas = async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query("SELECT * FROM linea_investigacion ORDER BY id");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener líneas" });
  }
};

export const createLinea = async (req: Request, res: Response) => {
  try {
    const { nombre, area } = req.body;
    const query = `
      INSERT INTO linea_investigacion(nombre, area)
      VALUES ($1, $2) RETURNING *`;
    const { rows } = await pool.query(query, [nombre, area]);
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al crear línea" });
  }
};
