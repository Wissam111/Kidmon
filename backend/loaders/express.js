const express = require('express')
const cors = require('cors')
const path = require('path')
const routes = require('../api/routes')
const configs = require('../configs')
const morgan = require('morgan')


module.exports = async ({ app }) => {

  app.use(cors())
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json())
  app.use(morgan(':method :url :response-time'))


  const imgsPath = path.join(__dirname, '..', 'uploaded-files')

  //routes
  app.use('/api/imgs', express.static(imgsPath));
  app.use(`/api/${configs.apiVersion}/`, await routes())


  //handling errors
  app.use((req, res, next) => {
    console.log('error')
    const error = new Error('Not found');
    next(error);
  });


  //handling all errors
  app.use((error, req, res, next) => {
    console.log(req.path, error.message)
    res.status(500);
    res.json({
      error: {
        message: error.message
      }
    })
  });

}



