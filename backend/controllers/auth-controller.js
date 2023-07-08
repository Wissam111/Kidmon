const { authService } = require("../use-cases");





exports.sendAuthVerification = async (req, res, next) => {
    // #swagger.tags = ['Auth']
    const { phone } = req.body

    try {
        const { verifyId } = await authService.sendAuthVerification({ phone })
        res.status(201).json({
            message: 'verification sent',
            verifyId: verifyId
        })
    } catch (e) {
        console.log(e);
        next(e)
    }
}




exports.verifyAndLogin = async (req, res, next) => {
    // #swagger.tags = ['Auth']
    const {verifyId, code } = req.body

    try {
        const authData = await authService.verifyAndLogin({  verifyId, code })
        res.status(200).json({
            message: 'login sucess',
            ...authData
        })

    } catch (e) {
        next(e)
    }
}