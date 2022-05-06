const { Router } = require('express');

const userController = require('../controllers/user.controller');
const userMiddlewares = require('../middlewares/user.middleware');

const userRouter = Router();

userRouter.get('/', userController.showAllUsers);

userRouter.get('/:userId',userMiddlewares.checkIsIdCorrect, userController.getUserById);

userRouter.delete('/:userId',userMiddlewares.checkIsIdCorrect, userController.dropUserById);

userRouter.post('/', userMiddlewares.checkIsEmailDuplicate, userController.createUser);

userRouter.put('/:userId', userMiddlewares.checkIsIdCorrect, userMiddlewares.checkIsCorrectBodyForUpdate, userController.updateUser);

module.exports = userRouter;