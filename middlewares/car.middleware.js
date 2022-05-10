const Car = require('../DB/Car.model');

const checkIsIdCorrect = (req, res, next) => {
    try {
        const {carId} = req.params;

        if (carId.length !== 24) {
            throw new Error('Id is incorrect');
        }

        next();
    } catch (e) {
        res.json(e.message);
    }
}

const checkIsCorrectBody = (req, res, next) => {
    try {
        const {name = '', color = '' } = req.body;

        if (name || color) {
            throw new Error('Name or color are empty');
        }
        next();
    } catch (e) {
        res.json(e.message);
    }
}

module.exports = {
    checkIsIdCorrect,
    checkIsCorrectBody
}