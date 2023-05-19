


const requireGreaterThanZero = (name = 'value') => {
    throw new Error(`The ${name} must be greater than zero`)
}

const requiredValue = (name = 'value') => {
    throw new Error(`The ${name} must be provided`)
}



module.exports = {
    requiredValue,
    requireGreaterThanZero
}

