import { CustomerSchema } from "../schemas/CustomerSchema.js";

export function CustomerFormatMiddleware(req, res, next) {
    const validation = CustomerSchema.validate(req.body, { abortEarly: false });
    if (validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(400).send(errors);
    }
    next();
}