const { makeVerify } = require("../../entities")
const { TooManyTriesError, NotFoundError } = require("../../utils/errors")



const buildSendAuthVerificationUseCase = ({ userDb, verifyDb, LOGIN_TRIES, MessageService, generatePINCode }) => {

    return async ({ phone }) => {

        const userFetched = await userDb.findByPhone({ phone: phone })
        if (!userFetched) {
            throw new NotFoundError("user with this number was not found")
        }

        const verifiesCount = await verifyDb.count({ phone: phone })
        if (verifiesCount > LOGIN_TRIES) {
            throw new TooManyTriesError("you have too many login tries , try again after some time")
        }

        const verify = makeVerify({ phone: phone, code: generatePINCode() })
        await verifyDb.create(verify)

        MessageService.sendMessage(`You're trying to authenticate here is you're code: ${verify.code}`, verify.phone)
        return {
            verifyId: verify.id
        }
    }


}


module.exports = {
    buildSendAuthVerificationUseCase
}