const express = require('express')
const server = express()
const routes = require('./routes.js')

// setting template engine
server.set('view engine', 'ejs')

// enable static files
server.use(express.static('public'))

// routes
server.use(routes)

server.listen(3030, () => console.log('is running'))
