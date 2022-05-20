const { authService } = require('../services');
const { authValidator } = require('../validators');
const OAuth = require('../DB/OAuth.model');
const ApiError = require('../error/ApiError');

function isLoginDataValid(req, res, next) {
    try {
        const { value, error } = authValidator.loginSchema.validate(req.body);

        if (error) {
            throw new ApiError(error.details[0].message);
        }

        req.body = value;

        next();
    } catch (e) {
        next(e);
    }
}


module.exports = {
    isLoginDataValid
};
