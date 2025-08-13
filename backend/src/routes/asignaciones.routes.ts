import { Router } from "express";
import { createAsignacion, getGrupos } from "../controllers/asignaciones.controller.js";
import { validateCreateAsignacion } from "../validators/asignacion.validator.js";
import { handleValidationErrors } from "../middlewares/validationResult.js";

const router = Router();

// Crear asignación (dispara trigger en BD)
router.post("/", validateCreateAsignacion, handleValidationErrors, createAsignacion);

// Listar grupos con miembros
router.get("/grupos", getGrupos);

export default router;
