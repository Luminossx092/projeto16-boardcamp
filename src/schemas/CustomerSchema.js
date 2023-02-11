import dayjs from "dayjs";
import Joi from "joi";

export const CustomerSchema = Joi.object({
    name: Joi.string().min(1).required(),
    phone: Joi.string().max(11).min(10).required(),
    cpf: Joi.string().pattern(/^[0-9]+$/).length(11).required(),
    birthday: Joi.date().less(dayjs().format('YYYY-MM-DD')).required()
})