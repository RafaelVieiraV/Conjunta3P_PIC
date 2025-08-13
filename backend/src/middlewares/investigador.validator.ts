import { body } from "express-validator";

export const validateCreateInvestigador = [
  body("nombre")
    .trim()
    .notEmpty().withMessage("El nombre es obligatorio")
    .isLength({ max: 100 }).withMessage("El nombre no puede superar 100 caracteres"),
  body("apellido")
    .trim()
    .notEmpty().withMessage("El apellido es obligatorio")
    .isLength({ max: 100 }).withMessage("El apellido no puede superar 100 caracteres"),
  body("departamento")
    .trim()
    .notEmpty().withMessage("El departamento es obligatorio")
    .isLength({ max: 100 }).withMessage("El departamento no puede superar 100 caracteres"),
  body("experiencia")
    .isInt({ min: 0 }).withMessage("La experiencia debe ser un número entero positivo o cero"),
];
