const sendAuthVerification = require('./send-auth-verification');
const verifyAndLogin = require('./verify-and-login');
const refreshToken = require('./refresh-token');



module.exports = {
    '/auth/send-auth-verification': {
        ...sendAuthVerification
    },

    // '/api/signup-verify-phone': {
    //     ...verifyAndSignup
    // },

    '/auth/login-verify-phone': {
        ...verifyAndLogin
    },

    // '/api/refresh-token': {
    //     ...refreshToken
    // },

    // '/api/signup': {
    //     ...signup
    // }

}