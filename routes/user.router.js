const { Router } = require('express');

const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');
const { commonMiddleware } = require('../middlewares');

const userRouter = Router();

userRouter.get(
    '/',
    commonMiddleware.checkIsQueryParamsValid,
    userController.showAllUsers
);

userRouter.post('/',
    userMiddleware.checkIsEmailDuplicate,
    userMiddleware.newUserValidator, userController.createUser
);

userRouter.all(
    '/:userId',
    userMiddleware.checkIsIdCorrect,
    userMiddleware.checkIsUserPresent
);

userRouter.get(
    '/:userId',
    userController.getUserById
);
userRouter.delete(
    '/:userId',
    userController.dropUserById
);
userRouter.put(
    '/:userId',
    userMiddleware.checkIsEmailDuplicate,
    userMiddleware.updateUserValidator,
    userController.updateUser);

module.exports = userRouter;
