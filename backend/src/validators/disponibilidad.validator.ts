import { body } from "express-validator";

export const validateCreateDisponibilidad = [
  body("franja_horaria")
    .trim()
    .notEmpty().withMessage("La franja horaria es obligatoria")
    .isLength({ max: 100 }).withMessage("La franja horaria no puede superar 100 caracteres"),
  body("modalidad")
    .trim()
    .isIn(["Presencial", "Virtual"])
    .withMessage("La modalidad debe ser 'Presencial' o 'Virtual'"),
];
