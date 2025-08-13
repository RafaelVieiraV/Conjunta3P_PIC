import { Router } from "express";
import { getLineas, createLinea } from "../controllers/lineas.controller.js";
import { validateCreateLinea } from "../validators/linea.validator.js";
import { handleValidationErrors } from "../middlewares/validationResult.js";

const router = Router();

router.get("/", getLineas);
router.post("/", validateCreateLinea, handleValidationErrors, createLinea);

export default router;
