const { User } = require('../DB/');
const ApiError = require('../error/ApiError');
const { userValidator } = require('../validators');
const { errorsEnum } = require('../constants');

const checkIsEmailDuplicate = async (req, res, next) => {
    try {
        const { email } = req.body;
        const [message, status] = Object.values(errorsEnum.USER_ALREADY_PRESENT);

        const isUserPresent = await User.findOne({ email: email.toLowerCase().trim() });

        if (isUserPresent) {
            throw new ApiError(message, status);
        }

        next();

    } catch (e) {
        next(e);
    }
}

const checkIsIdCorrect = (req, res, next) => {
    try {
        const {userId} = req.params;
        const [message, status] = Object.values(errorsEnum.INCORRECT_ID);

        if (userId.length !== 24) {
            throw new ApiError(message, status);
        }

        next();
    } catch (e) {
        next(e);
    }
}

const checkIsUserPresent = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const [message, status] = Object.values(errorsEnum.USER_NOT_FOUND);

        const userById = await User.findById(userId);

        if (!userById) {
            throw new ApiError(message, status);
        }

        req.user = userById;

        next();
    } catch (e) {
        next(e)
    }
}

const newUserValidator = (req, res, next) => {
    try {
        const { error, value } = userValidator.newUserJoiSchema.validate(req.body);

        if (error) {
            next(new ApiError(error.details[0].message, 400));
            return;
        }

        req.body = value;

        next()
    } catch (e) {
        next(e)
    }
}

const updateUserValidator = (req, res, next) => {
    try {
        const { error, value } = userValidator.updateUserJoiSchema.validate(req.body);

        if (error) {
            next(new ApiError(error.details[0].message, 400));
            return;
        }

        req.body = value;

        next()
    } catch (e) {
        next(e)
    }
}

const getUserDynamically = (paramName = '_id', where = 'body', dataBaseField = paramName) => {
    return async (req, res, next) => {
        try {
            const findObject = req[where];

            if (!findObject || typeof findObject !== "object") {
                throw new ApiError('Wrong search param in middleware');
            }

            const param = findObject[paramName];

            const user = await User.findOne({ [dataBaseField]: param }).select("+password");

            if (!user) {
                throw new ApiError('User not found', 404);
            }

            req.user = user;

            next()
        } catch (e) {
            next(e)
        }
    }
}

module.exports = {
    checkIsEmailDuplicate,
    checkIsIdCorrect,
    checkIsUserPresent,
    newUserValidator,
    updateUserValidator,
    getUserDynamically
}
