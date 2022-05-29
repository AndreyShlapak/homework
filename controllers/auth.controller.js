const { FRONTEND_URL } = require('../config/config');
const { emailActionsEnum, actionTypesEnum } = require('../constants');
const { authService, emailService } = require('../services');
const { OAuth, ActionToken, User } = require('../DB/');

const login = async (req, res, next) => {
    try {
        const { user, body: { password } } = req;

        await authService.comparePasswords(user.password, password);

        const tokenPair = authService.generateTokenPair({ userId: user._id });

        await OAuth.create({user_id: user._id, ...tokenPair});

        res.json({
            ...tokenPair,
            user
        });
    } catch (e) {
        next(e)
    }
}

const logout = async (req, res, next) => {
    try {
        await OAuth.deleteOne({ user_id: req.authUser._id });

        res.json('ok')
    } catch (e) {
        next(e);
    }
}

const refresh = async (req, res, next) => {
    try {
        const user = req.authUser;

        await OAuth.deleteMany({ user_id: user._id });

        const tokenPair = authService.generateTokenPair({ userId: user._id });

        await OAuth.create({user_id: user._id, ...tokenPair});

        res.json('ok')
    } catch (e) {
        next(e);
    }
}

const forgotPassword = async (req, res, next) => {
    try {
        const { user: { _id, name, email } } = req;
        const token = authService.generateActionToken({ userId: _id });

        await ActionToken.create({
            token,
            user_id: _id,
            actionType: actionTypesEnum.FORGOT_PASSWORD
        });

        const forgotPasswordUrl = `${FRONTEND_URL}/password/forgot?token=${token}`
        await emailService.sendMail(
            email,
            emailActionsEnum.FORGOT_PASSWORD,
            { forgotPasswordUrl, userName: name }
        )

        res.json('ok')
    } catch (e) {
        next(e);
    }
}

const setNewPassword = async (req, res, next) => {
    try {
        const { authUser, body: {token, password}, tokenName } = req;

        const newPassword = await authService.hashPassword(password);

        await User.updateOne({ _id: authUser._id }, { password: newPassword });
        await OAuth.deleteMany({ user_id: authUser._id });

        if (tokenName === 'action') {
            await ActionToken.deleteOne({ token });
        }

        res.json('ok');
    } catch (e) {
        next(e);
    }
}

module.exports = {
    login,
    logout,
    refresh,
    forgotPassword,
    setNewPassword
}
