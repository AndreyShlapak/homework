const { Car } = require('../DB');

module.exports = {
    showAllCars: async (req, res, next) => {
        try {
            const { limit = 20, page = 1 } = req.query;
            const skip = (page - 1) * limit;

            const cars = await Car.find().limit(limit).skip(skip).lean();
            const count = await Car.count({}).lean();

            res.json({
                page,
                perPage: limit,
                data: cars,
                count
            });
        } catch (e) {
            next(e);
        }
    },

    getCarById: async (req, res, next) => {
        try {
            const {carId} = req.params;
            const car = req.car || await Car.findById(carId);

            res.json(car);

        } catch (e) {
            next(e);
        }
    },

    dropCarById: async (req, res, next) => {
        try {
            const {carId} = req.params;
            const deletedCar = await Car.findByIdAndDelete(carId);

            res.json(deletedCar).status(204);

        } catch (e) {
            next(e);
        }
    },

    createCar: async (req, res, next) => {
        try {
            const createdCar = await Car.create(req.body);

            res.status(201).json(createdCar);

        } catch (e) {
            next(e);
        }
    },

    updateCar: async (req, res, next) => {
        try {
            const {carId} = req.params;
            const updatedCar = await Car.findByIdAndUpdate(carId, req.body);

            res.json(updatedCar).status(204);

        } catch (e) {
            next(e);
        }
    }
}
