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

module.exports = {
    login
}
