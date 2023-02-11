import Joi from "joi";

export const RentalSchema = Joi.object({
    customerId:Joi.number().required(),
    gameId:Joi.number().required(),
    daysRented:Joi.number().positive().integer().required()
})