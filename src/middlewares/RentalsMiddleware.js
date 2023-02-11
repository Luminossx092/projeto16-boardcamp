import { RentalSchema } from "../schemas/RentalSchema.js";

export function RentalFormatMiddleware(req, res, next) {
    const validation = RentalSchema.validate(req.body, { abortEarly: false });
    if (validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(400).send(errors);
    }
    next();
}