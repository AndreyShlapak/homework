const { Schema, model } = require('mongoose');

const { carTypesEnum } = require('../constants/');

const Car = new Schema({
        name: { type: String, trim: true, required: true },
        color: { type: String, trim: true, lowercase: true, required: true },
        age: { type: Number, default: 3 },
        type: { type: String, enum: Object.values(carTypesEnum), default: carTypesEnum.SEDAN },
    },
    { timestamps: true }
);

module.exports = model('Car', Car);
