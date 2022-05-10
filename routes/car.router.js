const { Router } = require('express');

const carController = require('../controllers/car.controller');
const carMiddlewares = require('../middlewares/car.middleware');

const carRouter = Router();

carRouter.get('/', carController.showAllCars);
carRouter.post('/', carMiddlewares.checkIsCorrectBody, carController.createCar);

carRouter.all('/:carId', carMiddlewares.checkIsIdCorrect, carMiddlewares.checkIsCarPresent);
carRouter.get('/:carId', carController.getCarById);
carRouter.delete('/:carId', carMiddlewares.checkIsIdCorrect, carController.dropCarById);
carRouter.put('/:carId', carMiddlewares.checkIsCorrectBody, carController.updateCar);

module.exports = carRouter;