const { Router } = require('express');

const carController = require('../controllers/car.controller');
const carMiddlewares = require('../middlewares/car.middleware');

const carRouter = Router();

carRouter.get('/', carController.showAllCars);

carRouter.get('/:carId', carMiddlewares.checkIsIdCorrect, carController.getCarById);

carRouter.delete('/:carId', carMiddlewares.checkIsIdCorrect, carController.dropCarById);

carRouter.post('/', carMiddlewares.checkIsCorrectBody, carController.createCar);

carRouter.put('/:carId', carMiddlewares.checkIsIdCorrect, carMiddlewares.checkIsCorrectBody, carController.updateCar);

module.exports = carRouter;