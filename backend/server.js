process.env.TZ = 'UTC'
const express = require('express')
const loaders = require('./loaders')
const configs = require('./configs')

const port = configs.port

const mode = () => `${configs.debug ? 'Debug' : 'Production'}`

const onListening = () => {
    console.log(
        `
      ################################################
      🛡️  Server listening on port: ${port} 🛡️
                
              Mode: ${mode()}

              http://localhost:${port}/api/${configs.apiVersion}/
      ################################################
    `
    );
}



const start = async () => {
    console.log('server is starting', `in ${mode()} mode`);

    const app = express()
    await loaders({ expressApp: app })

    app.listen(port, onListening)
        .on('error', (e) => {
            console.log(e)
        })
}



start()