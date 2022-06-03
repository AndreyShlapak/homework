const { authService } = require('../services');
const ApiError = require('../error/ApiError');
const { tokenTypeEnum, errorsEnum: {NO_TOKEN, NOT_VALID_TOKEN} } = require('../constants');
const { OAuth, ActionToken } = require('../DB');
const { passwordValidator, emailValidator, authValidator } = require('../validators');

function isLoginDataValid(req, res, next) {
    try {
        const { value, error } = authValidator.validate(req.body);

        if (error) {
            throw new ApiError(error.details[0].message);
        }

        req.body = value;

        next();
    } catch (e) {
        next(e);
    }
}

function isEmailValid(req, res, next) {
    try {
        const { value, error } = emailValidator.validate({ email : req.body.email });

        if (error) {
            throw new ApiError(error.details[0].message);
        }

        req.body.email = value.email;

        next();
    } catch (e) {
        next(e);
    }
}

function isPasswordValid(req, res, next) {
    try {
        const { value, error } = passwordValidator.validate({ password : req.body.password });

        if (error) {
            throw new ApiError(error.details[0].message);
        }

        req.body.password = value.password;

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
    checkToken,
    isEmailValid,
    isPasswordValid
};
