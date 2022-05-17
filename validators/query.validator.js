const Joi = require('joi');

const queryJoiSchema = Joi.object({
    page: Joi.number().integer(),
    limit: Joi.number().integer()
});

module.exports = queryJoiSchema;
