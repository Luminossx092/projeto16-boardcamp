import Joi from "joi";

export const GameSchema = Joi.object({
    name:Joi.string().min(2).required(),
    image:Joi.string().dataUri().required(),
    stockTotal:Joi.number().positive().integer().required(),
    pricePerDay:Joi.number().positive().precision(2).required()
})