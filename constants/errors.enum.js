module.exports = {
    WRONG_PASSWORD: {
        message: 'Wrong password',
        status: 400
    },
    CAR_NOT_FOUND: {
        message: 'Car not found',
        status: 404
    },
    USER_NOT_FOUND: {
        message: 'User not found',
        status: 404
    },
    INCORRECT_ID: {
        message: 'Id is incorrect',
        status: 400
    },
    NAME_EMAIL_EMPTY: {
        message: 'Name or email are empty',
        status: 400
    },
    WRONG_QUERY_PARAMS: {
        message: 'Wrong query params',
        status: 400
    },
    USER_ALREADY_PRESENT: {
        message: 'User with this email already present',
        status: 409
    }
}
