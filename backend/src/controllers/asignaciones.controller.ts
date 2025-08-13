import type { Request, Response } from "express";
import { pool } from "../db.js";

export const createAsignacion = async (req: Request, res: Response) => {
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
    res.status(500).json({ error: "Error al crear asignación" });
  }
};

export const getGrupos = async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query(`
      SELECT g.id, g.nombre, g.linea_id, g.disponibilidad_id, g.created_at,
             json_agg(json_build_object(
                'investigador_id', gm.investigador_id,
                'nombre', i.nombre,
                'apellido', i.apellido
             )) AS miembros
      FROM grupo g
      LEFT JOIN grupo_miembro gm ON gm.grupo_id = g.id
      LEFT JOIN investigador i ON i.id = gm.investigador_id
      GROUP BY g.id
      ORDER BY g.created_at DESC
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener grupos" });
  }
};
