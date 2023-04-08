const configs = require("../../configs");
const { userDb } = require("../../data-access/mongodb");
const { verifyDb } = require("../../data-access/redis");
const FakeMessageService = require("../../utils/FakeMessageService");
const { makeCreateToken } = require("../../utils/tokens-jwt");
const { buildSendAuthVerificationUseCase } = require("./send-auth-verify");
const { buildVerifyAndLoginUseCase } = require("./verify-and-login");



const generatePINCode = () => {
    if (!configs.production) {
        return "3333"
    }
    return Math.floor((Math.random() * 9000) + 1000)
}
const generateAccessToken = makeCreateToken('7', 'd')
const generateRefreshToken = makeCreateToken('30', 'd')



const sendAuthVerification = buildSendAuthVerificationUseCase({ userDb, verifyDb, LOGIN_TRIES: 5, MessageService: FakeMessageService, generatePINCode: generatePINCode })
const verifyAndLogin = buildVerifyAndLoginUseCase({ userDb, verifyDb, generateAccessToken, generateRefreshToken })


module.exports = {
    sendAuthVerification,
    verifyAndLogin
}