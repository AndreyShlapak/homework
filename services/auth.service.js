const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ApiError = require('../error/ApiError');
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, ACTION_TOKEN_SECRET } = require('../config/config');
const { tokenTypeEnum } = require('../constants');

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

function validateToken(token, tokenName) {
    try {
        let secretWord = ACCESS_TOKEN_SECRET;

        if (tokenName === tokenTypeEnum.REFRESH.name) {
            secretWord = REFRESH_TOKEN_SECRET
        }

        if (tokenName === tokenTypeEnum.ACTION.name) {
            secretWord = ACTION_TOKEN_SECRET;
        }

        return jwt.verify(token, secretWord);
    } catch (e) {
        throw new ApiError(e.message || 'Invalid token', 401);
    }
}

function generateActionToken(encodeData = {}) {
    return jwt.sign(encodeData, ACTION_TOKEN_SECRET, {expiresIn: '24h'})
}

module.exports = {
    comparePasswords,
    hashPassword,
    generateTokenPair,
    validateToken,
    generateActionToken
}
