const { getUserUseCase } = require("../../use-cases/user-use-case")
const { verifyAndExtractIdToken } = require("../../utils/tokens-jwt")



exports.requireAuthentication = async (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(401).json({ message: 'Authorization token required' })
    }

    try {
        const token = authorization.split(' ')[1]
        const id = await verifyAndExtractIdToken(token)
        const user = await getUserUseCase({ userId: id })
        if (!user) {
            return res.status(401).json({ message: 'user was not found, you might be blocked or deleted' })
        }

        
        req.user = user
        next()
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Request is not authorized' })
    }
}