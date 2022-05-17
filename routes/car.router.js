const { Router } = require('express');

const { carController } = require('../controllers');
const { carMiddlewares } = require('../middlewares');
const { commonMiddlewares } = require('../middlewares');

const carRouter = Router();

carRouter.get('/', commonMiddlewares.checkIsQueryParamsValid, carController.showAllCars);
carRouter.post('/', carMiddlewares.newCarValidator, carController.createCar);

carRouter.all('/:carId', carMiddlewares.checkIsIdLengthCorrect, carMiddlewares.checkIsCarPresent);
carRouter.get('/:carId', carController.getCarById);
carRouter.delete('/:carId', carController.dropCarById);
carRouter.put('/:carId', carMiddlewares.updateCarValidator, carController.updateCar);

module.exports = carRouter;
