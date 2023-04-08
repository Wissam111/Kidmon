

class ValidationError extends Error {
    constructor(message) {
        super(message)
    }
}


class NotFoundError extends Error {

    constructor(message) {
        super(message)
    }
}


class AlreadyExistsError extends Error {

    constructor(message) {
        super(message)
    }
}



class InsufesientFunds extends Error {

    constructor(message) {
        super(message)
    }
}


class UserRoleError extends Error {

    constructor(message) {
        super(message)
    }
}



module.exports = {
    ValidationError,
    NotFoundError,
    AlreadyExistsError,
    InsufesientFunds,
    UserRoleError
}