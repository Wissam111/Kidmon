const swaggerUi = require('swagger-ui-express')


const useSwaggerMiddlewares = async () => {

    await require('./swagger').makeSwaggerFile()
    const swaggerFile = require('./swagger-output.json')
    return [
        swaggerUi.serve,
        swaggerUi.setup(swaggerFile)
    ]
}

module.exports = {
    useSwaggerMiddlewares
}