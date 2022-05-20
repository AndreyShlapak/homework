const { authService } = require('../services');
const { authValidator } = require('../validators');
const OAuth = require('../DB/OAuth.model');
const ApiError = require('../error/ApiError');
const { tokenTypeEnum, errorsEnum: {NO_TOKEN, NOT_VALID_TOKEN} } = require('../constants');

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

function checkToken(tokenType = tokenTypeEnum.ACCESS, token_field = 'access_token') {
    return async (req, res, next) => {
        try {
            const token = req.get('Authorization');

            if (!token) {
                throw new ApiError(NO_TOKEN.message, NO_TOKEN.message);
            }

            authService.validateToken(token, tokenType);

            const tokenData = await OAuth.findOne({ [token_field] : token }).populate('user_id');

            if (!tokenData || !tokenData.user_id) {
                throw new ApiError(NOT_VALID_TOKEN.message, NOT_VALID_TOKEN.message);
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
