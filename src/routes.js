const express = require('express')
const routes = express.Router()
const ProfileController = require('./controllers/ProfileController')
const JobController = require('./controllers/JobController')

// page index
routes.get('/', JobController.index)

routes.get('/job', JobController.create)

// page job - post method 
routes.post('/job', JobController.save)

//  page jop-edit
routes.get('/job/:id', JobController.show)

//  page jop-edit - post method
routes.post('/job/:id', JobController.update)

routes.post('/job/delete/:id', JobController.delete)

// page profile
routes.get('/profile', ProfileController.index)

// page profile - method post
routes.post('/profile', ProfileController.update)

module.exports = routes
