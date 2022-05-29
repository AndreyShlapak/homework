const { authService } = require('../services');
const { authValidator } = require('../validators');
const ApiError = require('../error/ApiError');
const { tokenTypeEnum, errorsEnum: {NO_TOKEN, NOT_VALID_TOKEN} } = require('../constants');
const { OAuth, ActionToken } = require('../DB')

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
            const token = tokenType.name === 'action' ? req.body.token : req.get('Authorization');
            const Model = tokenType.name === 'action' ? ActionToken : OAuth;

            if (!token) {
                throw new ApiError(NO_TOKEN.message, NO_TOKEN.status);
            }

            authService.validateToken(token, tokenType.name);

            const tokenData = await Model.findOne({ [tokenType.fieldName] : token }).populate('user_id');

            if (!tokenData || !tokenData.user_id) {
                throw new ApiError(NOT_VALID_TOKEN.message, NOT_VALID_TOKEN.status);
            }

            req.authUser = tokenData.user_id;
            req.tokenName = tokenType.name;

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
