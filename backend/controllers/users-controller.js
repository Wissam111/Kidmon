const { deleteFile } = require("../api/middleware/file-functions");
const { userService } = require("../use-cases");





const updateUser = async (req, res, next) => {
    try {
        const { userId } = req.params
        const user = await userService.getUserUseCase({ userId: userId })
        res.status(200).json({
            message: 'user updated successfully',
            user
        })
    } catch (e) {
        console.log(e);
        next(e)
    }
}


const getUser = async (req, res, next) => {
    try {
        const { userId } = req.params
        const user = await userService.getUserUseCase({ userId: userId })
        res.status(200).json({
            message: 'user fetched successfully',
            user
        })
    } catch (e) {
        console.log(e);
        next(e)
    }
}


const getUsers = async (req, res, next) => {
    try {
        const { search, sort } = req.query;
        const page = +req.query.page;
        const pageSize = +req.query.pageSize;
        const users = await userService.getUsersUseCase({ search, page, pageSize, sort })
        res.status(200).json({
            message: 'users fetched successfully',
            users
        })
    } catch (e) {
        console.log(e);
        next(e)
    }
}


const getUserByBraceletId = async (req, res, next) => {
    try {
        const { braceletId } = req.params
        const user = await userService.getUserByBraceletIdUseCase({ braceletId: braceletId })
        res.status(200).json({
            message: 'user fetched successfully',
            user
        })
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
        res.status(201).json({
            message: 'created user successfully',
            user
        })
    } catch (e) {
        console.log(e);
        next(e)
    }
}


const createFamilyMemberUser = async (req, res, next) => {
    try {
        const { firstName, lastName, phone, parentId, braceletId, allergies, limits } = req.body
        const image = req.file?.filename
        const user = await userService.createFamilyMemberUserUseCase({ firstName, lastName, phone, parentId, braceletId, allergies, image, limits })
        res.status(201).json({
            message: 'created user successfully',
            user
        })
    } catch (e) {
        console.log(e);
        next(e)
    }
}




const createAdminUser = async (req, res, next) => {
    try {
        const { firstName, lastName, phone } = req.body
        const image = req.file?.filename
        const user = await userService.createAdminUserUseCase({ firstName, lastName, phone, image })
        res.status(201).json({
            message: 'created user successfully',
            user
        })
    } catch (e) {
        console.log(e);
        next(e)
    }
}






module.exports = {
    createFamilyMemberUser,
    createParentUser,
    createAdminUser,
    getUserByBraceletId,
    getUser,
    updateUser,
    getUsers
}


