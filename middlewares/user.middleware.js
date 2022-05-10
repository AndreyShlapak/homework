const User = require('../DB/User.model');
const ApiError = require("../error/ApiError");

const checkIsEmailDuplicate = async (req, res, next) => {
    try {
        const { email = '' } = req.body;

        if (!email) {
            throw new ApiError('Email is required', 400);
        }

        const isUserPresent = await User.findOne({ email: email.toLowerCase().trim() });

        if (isUserPresent) {
            throw new ApiError('User with this email already present', 409);
        }

        next();
    } catch (e) {
        next(e);
    }
}

const checkIsIdCorrect = (req, res, next) => {
    try {
        const {userId} = req.params;

        if (userId.length !== 24) {
            throw new ApiError('Id is incorrect', 400);
        }

        next();
    } catch (e) {
        next(e);
    }
}

const checkIsCorrectBody = (req, res, next) => {
    try {
        const {name = '', email = '' } = req.body;

        if (!(name && email)) {
            throw new ApiError('Name or email are empty', 400);
        }

        next();
    } catch (e) {
        next(e);
    }
}

const checkIsUserPresent = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const userById = await User.findById(userId);

        if (!userById) {
            throw new ApiError('User not found', 404);
        }

        req.user = userById;

        next();
    } catch (e) {
        next(e)
    }
}

module.exports = {
    checkIsEmailDuplicate,
    checkIsIdCorrect,
    checkIsCorrectBody,
    checkIsUserPresent
}