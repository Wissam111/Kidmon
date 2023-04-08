const getUsers = require('./get-users');
const getUser = require('./get-user');
const createParentUser = require('./create-parent-user');
const createFamilyMemberUser = require('./create-family-member-user');


module.exports = {
    // '/users': {
    //     ...getUsers,
    // },
    // '/users/{id}': {
    //     ...getUser,
    // },
    '/users/parent': createParentUser,
    '/users/family-member': createFamilyMemberUser


}