const { Schema, model } = require('mongoose');

const carRolesEnum = require('../constants/car-types.enum');

const Car = new Schema({
        name: { type: String, trim: true, required: true },
        color: { type: String, trim: true, lowercase: true, required: true },
        age: { type: Number, default: 3 },
        type: { type: String, enum: Object.values(carRolesEnum), default: carRolesEnum.SEDAN }
    },
    { timestamps: true }
);

module.exports = model('Car', Car);