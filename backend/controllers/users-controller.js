const { userService } = require("../use-cases");





const getUser = async (req, res) => {
    try {
        const { userId } = req.params
        const user = await userService.getUserUseCase({ userId: userId })
        res.status(200).json(user)
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Error getting user'
        })
    }
}



const createParentUser = async (req, res) => {
    try {
        console.log("createParentUser");
        const { firstName, lastName, phone } = req.body
        const user = await userService.createParentUserUseCase({ firstName, lastName, phone })
        res.status(201).json(user)
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Error creating user'
        })
    }
}


const createFamilyMemberUser = async (req, res) => {
    try {
        const { firstName, lastName, phone, parentId, braceletId, allergies } = req.body
        const user = await userService.createFamilyMemberUserUseCase({ firstName, lastName, phone, parentId, braceletId, allergies })
        res.status(201).json(user)
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Error creating user'
        })
    }
}




const createAdminUser = async (req, res) => {
    try {
        const { firstName, lastName, phone } = req.body
        const user = await userService.createAdminUserUseCase({ firstName, lastName, phone })
        res.status(201).json(user)
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Error creating user'
        })
    }
}







module.exports = {
    createFamilyMemberUser,
    createParentUser,
    createAdminUser,

    getUser
}


