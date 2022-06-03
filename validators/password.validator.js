const Joi = require('joi');
const {constants} = require('../constants');

const passwordSchema = Joi.object({
    password: Joi.string().regex(constants.PASSWORD_REGEXP).required()
});

module.exports = passwordSchema;
