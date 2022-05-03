const { Router } = require('express');

const carController = require('../controllers/car.controller');

const carRouter = Router();

carRouter.get('/', carController.showAllCars);

carRouter.get('/:carId', carController.getCarById);

carRouter.delete('/:carId', carController.dropCarById);

carRouter.post('/', carController.createCar);

carRouter.put('/:carId', carController.updateCar);

module.exports = carRouter;