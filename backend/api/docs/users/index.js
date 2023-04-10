const getUsers = require('./get-users');
const getUser = require('./get-user');
const createParentUser = require('./create-parent-user');
const createFamilyMemberUser = require('./create-family-member-user');
const createAdminUser = require('./create-admin-user');
const updateUser = require('./update-user');
const getUserByBraceletId = require('./get-user-by-bracelet-id');


module.exports = {
    '/users': {
        ...getUsers
    },
    '/users/bracelet/{braceletId}': {
        ...getUserByBraceletId
    },
    '/users/{id}': {
        ...getUser,
        ...updateUser
    },
    '/users/parent': createParentUser,
    '/users/family-member': createFamilyMemberUser,
    '/users/admin': createAdminUser,

}