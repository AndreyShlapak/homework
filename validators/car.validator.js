const Joi = require('joi')

const { carTypesEnum } = require('../constants/');

const newCarJoiSchema = Joi.object({
    name: Joi.string().alphanum().min(2).max(50).trim().required(),
    color: Joi.string().alphanum().trim().required(),
    age: Joi.number().integer().min(3).required(),
    type: Joi.valid(...Object.values(carTypesEnum)).required()
});

const updateCarJoiSchema = Joi.object({
    name: Joi.string().alphanum().min(2).max(50).trim(),
    color: Joi.string().alphanum().trim(),
    age: Joi.number().integer().min(3),
    type: Joi.valid(...Object.values(carTypesEnum))
});

module.exports = {
    newCarJoiSchema,
    updateCarJoiSchema
}
