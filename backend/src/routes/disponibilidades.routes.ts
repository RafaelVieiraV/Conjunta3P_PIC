import { Router } from "express";
import { getDisponibilidades, createDisponibilidad } from "../controllers/disponibilidades.controller.js";
import { validateCreateDisponibilidad } from "../validators/disponibilidad.validator.js";
import { handleValidationErrors } from "../middlewares/validationResult.js";

const router = Router();

router.get("/", getDisponibilidades);
router.post("/", validateCreateDisponibilidad, handleValidationErrors, createDisponibilidad);

export default router;
