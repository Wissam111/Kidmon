const { Server } = require("socket.io");


const SOCKET_IO_TOPICS = {
    Dashboard: 'dashboard'
}

const makeSocketIoModel = ({ server, emitters }) => {
    const socket = new Server(server)

    socket.on('connection', async function (clientSocket) {
        console.log('New client connected with id = ', clientSocket.id);

        // for (const em in emitters) {
        //     const data = await emitters[em]()
        //     clientSocket.emit(em, data)
        // }


        clientSocket.on('disconnect', function (reason) {
            console.log('A client disconnected with id = ', clientSocket.id, " reason ==> ", reason);
        });
    });




    return {
        emit: async (topic , data) => {
            console.log('emitting data');
            socket.emit(topic, data)
        }
    }
}

module.exports = {
    SOCKET_IO_TOPICS,
    makeSocketIoModel
}