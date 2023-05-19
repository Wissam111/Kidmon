const { port, apiVersion } = require('../../configs');
const path = require('path')
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    version: `${apiVersion}.0.0`,
    title: "My API",
    description: "KidMon Documentation"
  },
  host: `localhost:${port}/api/${apiVersion}`,
  basePath: "/",
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json']
}

const outputFile = `${__dirname}/swagger-output.json`;
const endpointsFiles = ['./api/routes/index.js'];
/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

module.exports = {
  makeSwaggerFile: async () => await swaggerAutogen(outputFile, endpointsFiles, doc)
} 