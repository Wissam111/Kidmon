
const CausesEnum = {
    notFound: 'Not Found',
    badRequest: 'Bad Request',
    forbidden: 'Forbidden',
    validation: 'Validation Error',
    alreadyExists: 'Already Exists'
}


class CustomError extends Error {
    constructor(message, cause) {
        super(message);

        this.cause = cause
    }
}


module.exports = {
    CustomError,
    CausesEnum
}