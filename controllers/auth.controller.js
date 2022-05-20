const { authService } = require('../services');
const OAuth = require('../DB/OAuth.model');

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

module.exports = {
    login,
    logout,
    refresh
}
