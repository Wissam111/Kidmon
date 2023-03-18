

const ValidateCharsOnly = {
    isValid: (value) => {
        return value.match(/^[a-zA-Z\u0590-\u05fe\u0621-\u064A]+( [a-zA-Z\u0590-\u05fe\u0621-\u064A]+)*$/);
    }
}



module.exports = {
    ValidateCharsOnly
}