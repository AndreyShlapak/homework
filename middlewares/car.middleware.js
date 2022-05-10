const Car = require('../DB/Car.model');
const ApiError = require("../error/ApiError");

const checkIsIdCorrect = (req, res, next) => {
    try {
        const {carId} = req.params;

        if (carId.length !== 24) {
            throw new ApiError('Id is incorrect', 400);
        }

        next();
    } catch (e) {
        next(e);
    }
}

const checkIsCorrectBody = (req, res, next) => {
    try {
        const {name = '', color = '' } = req.body;

        if (!(name && color)) {
            throw new ApiError('Name or color are empty', 400);
        }
        next();
    } catch (e) {
        next(e);
    }
}

const checkIsCarPresent = async (req, res, next) => {
    try {
        const { carId } = req.params;
        const carById = await Car.findById(carId);

        if (!carById) {
            throw new ApiError('Car not found', 404);
        }

        req.car = carById;

        next();
    } catch (e) {
        next(e)
    }
}

module.exports = {
    checkIsIdCorrect,
    checkIsCorrectBody,
    checkIsCarPresent
}