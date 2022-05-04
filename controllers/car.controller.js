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
        const carIndex = cars.findIndex((currentCar) => currentCar.id === carId);

        delete cars[carIndex];

        write(CarPathDB, cars.filter((car) => car));

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
