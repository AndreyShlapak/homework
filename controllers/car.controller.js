const cars = require('../DB/cars.json');
const write = require("../services/jsonChange");
const {CarPathDB} = require("../config/config");

module.exports = {
    showAllCars: (req, res) => {
        res.render('cars', { cars });
    },
    getCarById: (req, res) => {
        const {carId} = req.params

        for (const currentCar of cars) {
            if (currentCar.id == carId) {
                res.json(currentCar);
            }
        }
    },
    dropCarById: (req, res) => {
        const {carId} = req.params;
        const newCars = [];

        for (const currentCarIndex in cars) {
            if (cars[currentCarIndex].id === carId) {
                delete cars[currentCarIndex];
                continue;
            }
            newCars.push(cars[currentCarIndex]);
        }
        write(CarPathDB, newCars);

        res.redirect('http://localhost:5000/');
    },
    createCar: (req, res) => {
        cars.push(req.body);

        write(CarPathDB, cars);

        res.redirect('http://localhost:5000/');
    },
    updateCar: (req, res) => {
        const {carId} = req.params;

        for (const currentCarIndex in cars) {
            const currentCar = cars[currentCarIndex];

            if (currentCar.id == carId) {
                currentCar.name = req.body.name;
            }
        }
        write(CarPathDB, cars);

        res.redirect('http://localhost:5000/');
    }
}