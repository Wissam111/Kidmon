const basicInfo = require('./basicInfo');
const servers = require('./servers');
const components = require('./components');
const tags = require('./tags');
const appointments = require('./products');
const users = require('./users')
const auth = require('./auth');
const activities = require('./activities');

module.exports = {
    ...basicInfo,
    ...servers,
    ...components,
    ...tags,
    paths: {
        ...appointments,
        ...users,
        ...activities,
        ...auth,
    }
};