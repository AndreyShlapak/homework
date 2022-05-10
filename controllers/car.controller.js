const Car = require('../DB/Car.model');
const {raw} = require("express");

module.exports = {
    showAllCars: async (req, res) => {
        const cars = await Car.find({}).lean();

        res.render('cars', {cars});
    },
    getCarById: async (req, res) => {
        const {carId} = req.params;
        const car = await Car.findById(carId);

        res.json(car);
    },
    dropCarById: async (req, res) => {
        const {carId} = req.params;
        const deletedCar = await Car.findByIdAndDelete(carId);

        res.json(deletedCar).status(204);
    },
    createCar: async (req, res) => {
        const createdCar = await Car.create(req.body);

        res.status(201).json(createdCar);
    },
    updateCar: async (req, res) => {
        const {carId} = req.params;
        const updatedUser = await Car.findByIdAndUpdate(carId, req.body);

        res.json(updatedUser).status(204);
    }
}