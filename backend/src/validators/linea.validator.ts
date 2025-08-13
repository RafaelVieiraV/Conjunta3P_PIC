import { body } from "express-validator";

export const validateCreateLinea = [
  body("nombre")
    .trim()
    .notEmpty().withMessage("El nombre de la línea es obligatorio")
    .isLength({ max: 150 }).withMessage("El nombre de la línea no puede superar 150 caracteres"),
  body("area")
    .trim()
    .notEmpty().withMessage("El área es obligatoria")
    .isLength({ max: 150 }).withMessage("El área no puede superar 150 caracteres"),
];
