const { dashboardDb } = require("../data-access/redis");
const database = require("./database");
const expressLoader = require("./express");
const { subscribe } = require("./redis-sub");
const { makeSocketIoModel, SOCKET_IO_TOPICS } = require("./socketio-module");

module.exports = async ({ expressApp, server }) => {

  await expressLoader({ app: expressApp });
  console.log("express framework loaded");

  // connect to the databases
  await database();
  console.log("databases connected");


  const { emit: emitter } = makeSocketIoModel({
    server: server,
    initalEmitter: {
      topic: SOCKET_IO_TOPICS.Dashboard,
      getData: async () => await dashboardDb.find()
    }
  });
  console.log('socket io loaded')

  subscribe(async (data) => { emitter(SOCKET_IO_TOPICS.Dashboard, await dashboardDb.find()) })
  console.log('redis subcriber loaded')
};
