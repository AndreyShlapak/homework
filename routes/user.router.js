const { Router } = require('express');

const { userController } = require('../controllers');
const { userMiddlewares } = require('../middlewares');
const { commonMiddlewares } = require('../middlewares');

const userRouter = Router();

userRouter.get('/', commonMiddlewares.checkIsQueryParamsValid, userController.showAllUsers);
userRouter.post('/', userMiddlewares.checkIsEmailDuplicate, userMiddlewares.newUserValidator, userController.createUser);

userRouter.all('/:userId', userMiddlewares.checkIsIdCorrect, userMiddlewares.checkIsUserPresent);
userRouter.get('/:userId', userController.getUserById);
userRouter.delete('/:userId', userController.dropUserById);
userRouter.put('/:userId', userMiddlewares.checkIsEmailDuplicate, userMiddlewares.updateUserValidator, userController.updateUser);

module.exports = userRouter;
