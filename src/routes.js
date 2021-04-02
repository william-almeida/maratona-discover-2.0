const { req,res  } = require('express')
const express = require('express')

const routes = express.Router() 
const views = __dirname + '/views/'

const profile = {
    name: "William-Almeida",
    avatar: `https:github.com/william-almeida.png`,
    "monthly-budget": 3500,
    "hours-per-day": 3,
    "days-per-week": 5,
    "vocation-per-year": 2
}

// req , res 
routes.get('/', (req, res) =>  res.render(views + 'index'))
routes.get('/job', (req, res) => res.render(views + 'job'))
routes.get('/job/edit', (req,res) => res.render(views + 'job-edit'))
routes.get('/profile', (req, res) => res.render(views + 'profile', { profile }))

module.exports = routes