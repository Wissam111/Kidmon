const jwt = require('jsonwebtoken')
const moment = require('moment')
const configs = require('../configs')


const inValueEnum = ['d', 'm']

const makeCreateToken = (time, inValue) => {
    if (!Number.parseInt(time))
        throw new Error('Time must be an integer')

    if (!inValueEnum.includes(inValue))
        throw new Error('In value must be d or m')


    return (id) => {
        const date = moment().add(time, inValue)
        return {
            token: jwt.sign({ id: id }, configs.jwtSecret, { expiresIn: `${time}${inValue}` }),
            expireDate: date
        }
    }
}



const verifyAndExtractIdToken = async (token) => {
    const { id } = await jwt.verify(token, configs.jwtSecret)
    return id
}



module.exports = {
    makeCreateToken,
    verifyAndExtractIdToken
}