const express = require('express')
const routes = express.Router()

const Profile = {
  data: {
    name: "William Almeida",
    avatar: `https:github.com/william-almeida.png`,
    "monthly-budget": 3500,
    "hours-per-day": 3,
    "days-per-week": 5,
    "vacation-per-year": 4,
    "hour-value": 50
  },
  controllers: {
    index(req, res) {
      return res.render('profile', { profile: Profile.data })
    },
    update(req, res) {
      const data = req.body
      const weeksPerYear = 52
      const weeksPerMonth = (weeksPerYear - data['vacation-per-year']) / 12
      const weekTotalHours = data['hours-per-day'] * data['days-per-week']
      const monthlyTotalHours = weekTotalHours * weeksPerMonth
      const hourValue = data['monthly-budget'] / monthlyTotalHours
      Profile.data = {
        ...Profile.data,
        ...req.body,
        'hour-value': hourValue
      }
      return res.redirect('/profile')
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
      created_at: Date.now(),
      budget: 4500
    },
    {
      id: 2,
      name: 'GitHub',
      "daily-hours": 1,
      "total-hours": 10,
      created_at: Date.now(),
      budget: 4500

    }
  ],
  controllers: {
    index(req, res) {
      const updatedJobs = Job.data.map((job) => {
        const remaining = Job.services.remainingDays(job)
        const status = remaining <= 0 ? 'done' : 'progress'
        // ...job + incremento
        return {
          ...job,
          remaining,
          status,
          budget: Job.services.calculateBudget(job, Profile.data['hour-value'])
        }
      })
      return res.render('index', { jobs:updatedJobs })
    },
    create(req, res) {
      return res.render('job')
    },
    post(req, res){
      const lastId = Job.data[Job.data.length -1]?.id  || 0
      Job.data.push({
        id: lastId + 1,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
        created_at: Date.now()      
      })
      return res.redirect('/')
    },
    show(req,res) {
      const jobId = req.params.id
      const job = Job.data.find(job => Number(job.id) === Number(jobId))
      if (!job){
        return res.send('Job not found!')
      }
      job.budget = Job.services.calculateBudget(job, Profile.data['hour-value'])
      return res.render('job-edit', { job })
    },
    update(req, res) {
      const newData = req.body
      const jobId = req.params.id
      const job = Job.data.find(job => Number(job.id) === Number(jobId))
      if (!job){
        return res.send('Job not found!')
      }

      const updatedJob = {
        ...job,
        name: newData.name,
        'total-hours': newData['total-hours'],
        'daily-hours': newData['daily-hours']      
      }
      Job.data = Job.data.map(job => {
        if (Number(job.id) === Number(jobId)){
          job = updatedJob
        }
        return job
      })
      return res.redirect('/job/' + jobId)
    },
    delete(req, res) {
      const jobId = req.params.id
      Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId))
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
    },
    calculateBudget(job, hourValue) {
      return hourValue * job['total-hours']
    }
  }
}

// page index
routes.get('/', Job.controllers.index)

routes.get('/job', Job.controllers.create)

// page job - post method 
routes.post('/job', Job.controllers.post)

//  page jop-edit
routes.get('/job/:id', Job.controllers.show)

//  page jop-edit - post method
routes.post('/job/:id', Job.controllers.update)

routes.post('/job/delete/:id', Job.controllers.delete)

// page profile
routes.get('/profile', Profile.controllers.index)
routes.post('/profile', Profile.controllers.update)


module.exports = routes