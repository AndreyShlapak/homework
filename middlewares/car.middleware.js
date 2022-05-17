const { Car } = require('../DB');
const ApiError = require('../error/ApiError');
const {carValidator} = require('../validators');
const { errorsEnum } = require('../constants');

const checkIsIdLengthCorrect = (req, res, next) => {
    try {
        const {carId} = req.params;
        const [message, status] = Object.values(errorsEnum.INCORRECT_ID);

        if (carId.length !== 24) {
            throw new ApiError(message, status);
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
        const [message, status] = Object.values(errorsEnum.CAR_NOT_FOUND);

        if (!carById) {
            throw new ApiError(message, status);
        }

        req.car = carById;

        next();
    } catch (e) {
        next(e)
    }
}

const newCarValidator = (req, res, next) => {
    try {
        const { error, value } = carValidator.newCarJoiSchema.validate(req.body);

        if (error) {
            next(new ApiError(error.details[0].message, 400));
            return;
        }

        req.body = value;

        next()
    } catch (e) {
        next(e)
    }
}

const updateCarValidator = (req, res, next) => {
    try {
        const { error, value } = carValidator.updateCarJoiSchema.validate(req.body);

        if (error) {
            next(new ApiError(error.details[0].message, 400));
            return;
        }

        req.body = value;

        next()
    } catch (e) {
        next(e)
    }
}

module.exports = {
    checkIsIdLengthCorrect,
    checkIsCarPresent,
    newCarValidator,
    updateCarValidator
}
