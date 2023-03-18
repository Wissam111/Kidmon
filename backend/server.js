process.env.TZ = 'UTC'
const express = require('express')
const loaders = require('./loaders')
const configs = require('./configs')

const port = configs.port



const onListening = () => {
    console.log(
        `
      ################################################
      🛡️  Server listening on port: ${port} 🛡️
              
              http://localhost:${port}/api/
      ################################################
    `
    );
}



const start = async () => {
    console.log('server is starting');

    const app = express()
    await loaders({ expressApp: app })

    app.listen(port, onListening)
        .on('error', (e) => {
            console.log(e)
        })
}



start()