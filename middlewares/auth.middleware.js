const { authService } = require('../services');
const { authValidator } = require('../validators');
const OAuth = require('../DB/OAuth.model');
const ApiError = require('../error/ApiError');
const { tokenTypeEnum } = require('../constants');

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

function checkToken(tokenType = tokenTypeEnum.ACCESS) {
    return async (req, res, next) => {
        try {
            const refresh_token = req.get('Authorization');

            if (!refresh_token) {
                throw new ApiError('No token', 401);
            }

            authService.validateToken(refresh_token, tokenType);

            const tokenData = await OAuth.findOne({ refresh_token }).populate('user_id');

            if (!tokenData || !tokenData.user_id) {
                throw new ApiError('Not valid token', 401);
            }

            req.authUser = tokenData.user_id;

            next();
        } catch (e) {
            next(e);
        }
    }

}

module.exports = {
    isLoginDataValid,
    checkToken
};
