const express = require('express')
const cors = require('cors')
const path = require('path')
const routes = require('../api/routes')


module.exports = async ({ app }) => {

  app.use(cors())
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json())

  const imgsPath = path.join(__dirname, '..', 'imgs')
  const htmlPath = path.join(__dirname, '..', 'public')

  //routes
  app.use('/api/v1/', routes())


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



