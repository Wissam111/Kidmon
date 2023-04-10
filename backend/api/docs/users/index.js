const getUsers = require('./get-users');
const getUser = require('./get-user');
const createParentUser = require('./create-parent-user');
const createFamilyMemberUser = require('./create-family-member-user');
const createAdminUser = require('./create-admin-user');
const updateUser = require('./update-user');


module.exports = {
    '/users': {
        ...getUsers
    },
    '/users/{id}': {
        ...getUser,
        ...updateUser
    },
    '/users/parent': createParentUser,
    '/users/family-member': createFamilyMemberUser,
    '/users/admin': createAdminUser,

}