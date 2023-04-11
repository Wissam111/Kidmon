const database = require("./database");
const expressLoader = require("./express");

module.exports = async ({ expressApp }) => {
  await expressLoader({ app: expressApp });
  console.log("express framework loaded");

  // connect to the databases
  // await database()
  console.log("databases connected");
};
