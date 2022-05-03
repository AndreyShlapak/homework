const { Router } = require('express');

const userController = require('../controllers/user.controller');

const userRouter = Router();

userRouter.get('/', userController.showAllUsers);

userRouter.get('/:userId', userController.getUserById);

userRouter.delete('/:userId', userController.dropUserById);

userRouter.post('/', userController.createUser);

userRouter.put('/:userId', userController.updateUser);

module.exports = userRouter;