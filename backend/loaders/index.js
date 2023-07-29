const database = require("./database");
const expressLoader = require("./express");
const { subscribe } = require("./redis-sub");
const { makeSocketIoModel, SOCKET_IO_TOPICS } = require("./socketio-module");

module.exports = async ({ expressApp }) => {
  await expressLoader({ app: expressApp });
  console.log("express framework loaded");

  // connect to the databases
  await database();
  console.log("databases connected");



  const { emit: emitter } = makeSocketIoModel({
    server: server,
    // emitters: {
    //   [SOCKET_IO_TOPICS.Dashboard]: dbRedis.fetchStats
    // }
  });

  subscribe(emitter)
};
