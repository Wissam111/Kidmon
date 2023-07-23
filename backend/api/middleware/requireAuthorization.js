const configs = require("../../configs");
const user = require("../../entities/user");
const { USER_ROLES_ENUM, USER_ROLES } = require("../../entities/user")


exports.makeRoleAuthorization = ({ userRoles = USER_ROLES_ENUM }) => {

    return (req, res, next) => {
        if (!configs.auth_mode || req.user.role === USER_ROLES.admin) {
            return next()
        }

        if (!req.user) {
            throw new Error('user cannot be null');
        }
        if (!userRoles.includes(req.user.role)) {
            return res.status(403).json({ message: 'You\'re not authorized to access this route' })
        }

        next()
    }

}



// Define middleware to check user authorization
exports.makeFieldAuthorization = ({ reqData, userField }) => {
    return (req, res, next) => {
        if (!configs.auth_mode || req.user.role === USER_ROLES.admin) {
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



/**
 * 
 * @param {*} onlyParent: considers only parent, if set to false will allow family members also
 * @returns 
 */
exports.makeParentAuthorization = ({ reqData, onlyParent = true }) => {
    return (req, res, next) => {
        if (!configs.auth_mode || req.user.role === USER_ROLES.admin) {
            return next()
        }

        if (!req.user) {
            throw new Error('user cannot be null')
        }

        // check if the parent for this family member
        if (USER_ROLES.parent === req.user.role && !req.user.familyMembers.includes(req[reqData.in][reqData.field])) {
            return res.status(403).json({ message: 'Unauthorized, Wrong Parent' });
        }

        // only parent is true and this is a family member
        if (onlyParent && USER_ROLES.familyMember === req.user.role) {
            return res.status(403).json({ message: 'Unauthorized, Only parent allowed' });
        }

        next();
    }
}



