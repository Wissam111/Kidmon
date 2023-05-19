const configs = require("../../configs");
const { USER_ROLES_ENUM, USER_ROLES } = require("../../entities/user")


exports.makeRoleAuthorization = ({ userRoles = USER_ROLES_ENUM }) => {

    return (req, res, next) => {
        if (configs.debug || req.user.role === USER_ROLES.admin) {
            return next()
        }

        if (!req.user) {
            throw new Error('user cannot be null');
        }
        if (!userRoles.includes(req.user.role)) {
            return res.status(403).json({ message: 'You\'re not a authorized to access this route' })
        }

        next()
    }

}



// Define middleware to check user authorization
exports.makeFieldAuthorization = ({ reqData, userField }) => {
    return (req, res, next) => {
        if (configs.debug || req.user.role === USER_ROLES.admin) {
            return next()
        }

        if (!req.user) {
            throw new Error('user cannot be null')
        }
        if (req[reqData.in][reqData.field] !== req.user[userField]) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        next();
    }
}