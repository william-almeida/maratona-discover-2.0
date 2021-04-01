const express = require('express')
const server = express()

// enable static files
server.use(express.static('public'))

// request, response
server.get('/', (request, response) => {

    return response.sendFile(__dirname + "/views/index.html")
})
server.listen(3030, () => console.log('is run'))
