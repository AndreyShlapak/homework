const User = require('../DB/User.model');

const checkIsEmailDuplicate = async (req, res, next) => {
    try {
        const { email = '' } = req.body;

        if (!email) {
            throw new Error('Email is required');
        }

        const isUserPresent = await User.findOne({ email: email.toLowerCase().trim() });

        if (isUserPresent) {
            throw new Error('User with this email already present');
        }

        next();
    } catch (e) {
        res.json(e.message);
    }
}

const checkIsIdCorrect = (req, res, next) => {
    try {
        const {userId} = req.params;

        if (userId.length !== 24) {
            console.log(1123)
            throw new Error('Id is incorrect');
        }
        next();
    } catch (e) {
        res.json(e.message);
    }
}

const checkIsCorrectBodyForUpdate = (req, res, next) => {
    try {
        const {name = '', email = '' } = req.body;

        if (name || email) {
            throw new Error('Name or email are empty');
        }
        next();
    } catch (e) {
        res.json(e.message);
    }
}

module.exports = {
    checkIsEmailDuplicate,
    checkIsIdCorrect,
    checkIsCorrectBodyForUpdate
}