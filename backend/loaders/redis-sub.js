const { createClient } = require('redis');
const { dashboardDb } = require('../data-access/redis');




const sub = async (emitter) => {

    const client = createClient();

    const subscriber = client.duplicate();

    await subscriber.connect();

    await subscriber.subscribe('dashboard:update', (message) => {
        console.log(message); // 'message'
        emitter(message)
    });
}


module.exports = {
    subscribe: sub
}