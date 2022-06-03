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
    authMiddleware.checkToken(tokenTypeEnum.REFRESH),
    authController.refresh
);

authRouter.post(
    '/password/forgot',
    authMiddleware.isEmailValid,
    userMiddleware.getUserDynamically('email'),
    authController.forgotPassword
);

authRouter.patch(
    '/password/forgot',
    authMiddleware.checkToken(tokenTypeEnum.ACTION),
    authMiddleware.isPasswordValid,
    authController.setNewPassword
);

authRouter.patch(
    '/password/change',
    authMiddleware.checkToken(),
    authMiddleware.isPasswordValid,
    authController.setNewPassword
);

module.exports = authRouter;
