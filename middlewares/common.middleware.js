const {errorsEnum} = require("../constants");
const ApiError = require("../error/ApiError");
const {queryJoiSchema} = require('../validators');

const checkIsQueryParamsValid = (req, res, next) => {
    try {
        const [message, status] = Object.values(errorsEnum.WRONG_QUERY_PARAMS);
        const { error, value } = queryJoiSchema.validate(req.query);

        if (error) {
            throw new ApiError(error.details[0].message, 400);
        }

        req.query = value;

        next();

    } catch (e) {
        next(e);
    }
}

module.exports = {
    checkIsQueryParamsValid
}
