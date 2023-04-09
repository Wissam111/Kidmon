const { deleteFile } = require("../api/middleware/file-functions");
const { userService } = require("../use-cases");





const getUser = async (req, res) => {
    try {
        const { userId } = req.params
        const user = await userService.getUserUseCase({ userId: userId })
        res.status(200).json(user)
    } catch (e) {
        console.log(e);
        next(e)
    }
}



const createParentUser = async (req, res, next) => {
    try {
        console.log("createParentUser");
        const { firstName, lastName, phone } = req.body
        const image = req.file?.filename
        const user = await userService.createParentUserUseCase({ firstName, lastName, phone, image })
        res.status(201).json(user)
    } catch (e) {
        console.log(e);
        next(e)
    }
}


const createFamilyMemberUser = async (req, res) => {
    try {
        const { firstName, lastName, phone, parentId, braceletId, allergies } = req.body
        const image = req.file?.filename
        const user = await userService.createFamilyMemberUserUseCase({ firstName, lastName, phone, parentId, braceletId, allergies, image })
        res.status(201).json(user)
    } catch (e) {
        console.log(e);
        next(e)
    }
}




const createAdminUser = async (req, res) => {
    try {
        const { firstName, lastName, phone } = req.body
        const image = req.file?.filename
        const user = await userService.createAdminUserUseCase({ firstName, lastName, phone, image })
        res.status(201).json(user)
    } catch (e) {
        console.log(e);
        next(e)
    }
}






module.exports = {
    createFamilyMemberUser,
    createParentUser,
    createAdminUser,

    getUser
}


