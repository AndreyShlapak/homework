const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ApiError = require('../error/ApiError');
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require('../config/config');

async function comparePasswords(hashPassword, password) {
    const isPasswordSame = await bcrypt.compare(password, hashPassword);

    if (!isPasswordSame) {
        throw new ApiError('Wrong password', 400);
    }
}

function hashPassword(password) {
    return bcrypt.hash(password, 10);
}

function generateTokenPair(encodeData = {}) {
    const access_token = jwt.sign(encodeData, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refresh_token = jwt.sign(encodeData, REFRESH_TOKEN_SECRET, { expiresIn: '30d' });

    return {
        access_token, // yJhbGciOiJQUzUxMiIsI
        refresh_token // Vtv6AzW6NRuEEkXwp
    }
}

module.exports = {
    comparePasswords,
    hashPassword,
    generateTokenPair
}
