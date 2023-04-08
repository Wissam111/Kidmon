const { NotFoundError, CodeNotMatch } = require("../../utils/errors")


const buildVerifyAndLoginUseCase = ({ userDb, verifyDb, generateAccessToken, generateRefreshToken }) => {

    return async ({ verifyId, code }) => {
        // check if the code match
        const verify = await verifyDb.findById({ id: verifyId })
        if (!verify) {
            throw new NotFoundError('No verification found !')
        }
        if (verify.code !== code) {
            throw new CodeNotMatch('Code not match !')
        }

        let user = await userDb.findByPhone({ phone: verify.phone })
        if (!user) {
            throw new NotFoundError('user was not found')
        }


        //create token
        const { token, expireDate } = generateAccessToken(user._id)
        const { token: refresh_token, expireDate: expireDateRefreshToken } = generateRefreshToken(user._id)


        return {
            user: user,
            token,
            refresh_token,
            expireDateRefreshToken: expireDateRefreshToken,
            expireDate: expireDate
        }
    }

}


module.exports = {
    buildVerifyAndLoginUseCase
}