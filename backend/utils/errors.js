

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



class TooManyTriesError extends Error {

    constructor(message) {
        super(message)
    }
}


class CodeNotMatch extends Error {
    constructor(message) {
        super(message)
    }
}



class CreditsLimitError extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = {
    CodeNotMatch,
    TooManyTriesError,
    ValidationError,
    NotFoundError,
    AlreadyExistsError,
    InsufesientFunds,
    UserRoleError,
    CreditsLimitError
}