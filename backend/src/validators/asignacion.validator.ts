import { body } from "express-validator";

export const validateCreateAsignacion = [
  body("investigador_id")
    .isInt({ min: 1 }).withMessage("El ID del investigador debe ser un número entero mayor que cero"),
  body("linea_id")
    .isInt({ min: 1 }).withMessage("El ID de la línea debe ser un número entero mayor que cero"),
  body("disponibilidad_id")
    .isInt({ min: 1 }).withMessage("El ID de la disponibilidad debe ser un número entero mayor que cero"),
];
