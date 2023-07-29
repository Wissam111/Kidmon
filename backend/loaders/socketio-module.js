const { Server } = require("socket.io")

const SOCKET_IO_TOPICS = {
    Dashboard: 'dashboard'
}

const makeSocketIoModel = ({ server, initalEmitter }) => {
    const socket = new Server(server)

    socket.on('connection', async (clientSocket) => {
        console.log('New client connected with id = ', clientSocket.id);

        clientSocket.emit(initalEmitter.topic , await initalEmitter.getData())

        clientSocket.on('disconnect', function (reason) {
            console.log('A client disconnected with id = ', clientSocket.id, " reason ==> ", reason);
        });
    });

    return {
        emit: async (topic, data) => {
            console.log('emitting data');
            socket.emit(topic, data)
        }
    }
}

module.exports = {
    SOCKET_IO_TOPICS,
    makeSocketIoModel
}