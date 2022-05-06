const Car = require('../DB/Car.model');

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
    dropCarById: (req, res) => {
        const {carId} = req.params;

        Car.findByIdAndDelete(carId)
            .then(car => {
                res.redirect('http://localhost:5000/cars');
            });
    },
    createCar: (req, res) => {
        Car.create(req.body)
            .then(createdCar => {
                res.status(201).json(createdCar);
            })
            .catch((err) => console.error(err));
    },
    updateCar: (req, res) => {
        const {carId} = req.params;

        Car.findByIdAndUpdate(carId, req.body)
            .then((car) => {
                res.redirect('http://localhost:5000/cars');
            });
    }
}