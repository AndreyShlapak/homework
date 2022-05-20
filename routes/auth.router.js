const { Router } = require('express');

const { authController } = require('../controllers');
const { authMiddleware, userMiddleware } = require('../middlewares');
const { tokenTypeEnum } = require('../constants')

const authRouter = Router();

authRouter.post(
    '/login',
    authMiddleware.isLoginDataValid,
    userMiddleware.getUserDynamically('email'),
    authController.login
);

authRouter.post(
    '/logout',
    authMiddleware.checkToken(),
    authController.logout
);

authRouter.post(
    '/refresh',
    authMiddleware.checkToken(tokenTypeEnum.REFRESH, 'refresh_token'),
    authController.refresh
);

module.exports = authRouter;
