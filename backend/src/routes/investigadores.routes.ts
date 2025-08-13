import { Router } from "express";
import { getInvestigadores, createInvestigador } from "../controllers/investigadores.controller.js";
import { validateCreateInvestigador } from "../validators/investigador.validator.js";
import { handleValidationErrors } from "../middlewares/validationResult.js";

const router = Router();

router.get("/", getInvestigadores);
router.post("/", validateCreateInvestigador, handleValidationErrors, createInvestigador);

export default router;
