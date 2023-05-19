const configs = require("../../configs");
const { USER_ROLES_ENUM } = require("../../entities/user")


exports.makeRoleAuthorization = ({ userRoles = USER_ROLES_ENUM }) => {
    
    return (req, res, next) => {
        if(configs.debug){
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
exports.makeCheckAuthorization = ({ reqfieldName, userFieldName, reqDataField }) => {
    return (req, res, next) => {
        if(configs.debug){
            return next()
        }
        
        if (!req.user) {
            throw new Error('user cannot be null')
        }
        if (req[reqDataField][reqfieldName] !== req.user[userFieldName]) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        next();
    }
}