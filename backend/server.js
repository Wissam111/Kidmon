process.env.TZ = 'UTC'
const http = require("http");
const express = require('express')
const loaders = require('./loaders')
const configs = require('./configs');
const { run_workers } = require("./workers");

const port = configs.port

const mode = () => `${configs.debug ? 'Debug' : 'Production'}`
const auth_mode = () => `${configs.auth_mode ? 'On' : 'off'}`


const onListening = () => {
    console.log(
        `
      ################################################
      🛡️  Server listening on port: ${port} 🛡️
                
              Mode: ${mode()}
              Authorization Mode: ${auth_mode()}
              
              http://localhost:${port}/api/${configs.apiVersion}/
      ################################################
    `
    );
}



const start = async () => {
    console.log('server is starting', `in ${mode()} mode`);

    const app = express()
    const server = http.createServer(app);
    await loaders({ expressApp: app, server: server })

    run_workers()
    console.log('loaded workers');

    server.on("error", err => console.log(err));
    server.on("listening", onListening);
    server.listen(port);
}



start()