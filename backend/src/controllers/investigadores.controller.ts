import type { Request, Response } from "express";
import { pool } from "../db.js";

export const getInvestigadores = async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query("SELECT * FROM investigador ORDER BY id");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener investigadores" });
  }
};

export const createInvestigador = async (req: Request, res: Response) => {
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
    res.status(500).json({ error: "Error al crear investigador" });
  }
};
