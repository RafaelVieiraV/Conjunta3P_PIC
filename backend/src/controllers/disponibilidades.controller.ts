import type { Request, Response } from "express";
import { pool } from "../db.js";

export const getDisponibilidades = async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query("SELECT * FROM disponibilidad ORDER BY id");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener disponibilidades" });
  }
};

export const createDisponibilidad = async (req: Request, res: Response) => {
  try {
    const { franja_horaria, modalidad } = req.body;
    const query = `
      INSERT INTO disponibilidad(franja_horaria, modalidad)
      VALUES ($1, $2) RETURNING *`;
    const { rows } = await pool.query(query, [franja_horaria, modalidad]);
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al crear disponibilidad" });
  }
};
