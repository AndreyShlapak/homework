const { Router } = require('express');

const userController = require('../controllers/user.controller');
const userMiddlewares = require('../middlewares/user.middleware');

const userRouter = Router();

userRouter.get('/', userController.showAllUsers);
userRouter.post('/', userMiddlewares.checkIsCorrectBody, userMiddlewares.checkIsEmailDuplicate, userController.createUser);

userRouter.all('/:userId', userMiddlewares.checkIsIdCorrect, userMiddlewares.checkIsUserPresent);
userRouter.get('/:userId', userController.getUserById);
userRouter.delete('/:userId', userController.dropUserById);
userRouter.put('/:userId', userMiddlewares.checkIsCorrectBody, userMiddlewares.checkIsEmailDuplicate, userController.updateUser);

module.exports = userRouter;