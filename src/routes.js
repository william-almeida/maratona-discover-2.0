const { req,res  } = require('express')
const express = require('express')

const routes = express.Router() 
const views = __dirname + '/views/'

const Profile = {
  date: {
    name: "William-Almeida",
    avatar: `https:github.com/william-almeida.png`,
    "monthly-budget": 3500,
    "hours-per-day": 3,
    "days-per-week": 5,
    "vocation-per-year": 2,
    "hour-value": 50
  },
  controllers = {
    index(req, res) {
      return res.render(views + 'profile', { profile: Profile.data})
    }
  }
}

const Job = {
  data: [
    {
      id: 1,
      name: 'Maratona Discover',
      "daily-hours": 3,
      "total-hours": 40,
      created_at: Date.now()  
    },
    {
      id: 2,
      name: 'GitHub',
      "daily-hours": 1,
      "total-hours": 0,
      created_at: Date.now()  
    }
  ],
  controllers: {
    index(req, res) {
      const updatedJobs = JOb.data.map((job) => {
        const remaining = Job.services.remainingDays(job)
        const status = remaining <= 0 ? 'done' : 'progress'
        // ...job + incremento
        return {
          ...job,
          remaining,
          status,
          budget: profile["hour-value"] * job["total-hours"]
        }
      })
      return res.render(views + 'index', { jobs:updatedJobs })
    },
    create(req, res) {
      return res.render(views + 'job')
    },
    post(req, res){
      const lastId = Job.data[Job.data.length -1]?.id  || 1
      Job.data.push({
        id: lastId + 1,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
        created_at: Date.now()      
      })
      return res.redirect('/')
    }

  },
  services: {
    remainingDays(job) {
      const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed()
      const createdDate = new Date(job.created_at)
      const dueDay = createdDate.getDate() + Number(remainingDays)
      const dueDateInMs = createdDate.setDate(dueDay)
      const timeDiffInMs = dueDateInMs - Date.now()
      // change milliseconds to days
      const dayInMs = 1000 * 60 * 60 * 24 //86400000ms
      const dayDiff = (timeDiffInMs / dayInMs ).toFixed()
      
      return dayDiff
    }
  }
}

// page index
routes.get('/', Job.controllers.index)

routes.get('/job', Job.controllers.create)

// page job - post method 
routes.post('/job', Job.controllers.post)

//  page jop-edit
routes.get('/job/edit', (req,res) => res.render(views + 'job-edit'))

// page profile
routes.get('/profile', Profile.controllers.index)


module.exports = routes