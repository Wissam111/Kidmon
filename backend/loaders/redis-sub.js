const { createClient } = require('redis')




const sub = async (emitter) => {

    const client = redis.createClient();

    const subscriber = client.duplicate();

    await subscriber.connect();

    await subscriber.subscribe('dashboard', (message) => {
        console.log(message); // 'message'
        emitter(message)
    });
}


module.exports = {
    subscribe: sub
}