const Job = require('../model/Job')
const Profile = require('./model/Profile')
const JobUtils = require('../utils/jobUtils')
const Profile = require('../model/Profile')


module.exports = {
  index(req, res) {
    const jobs = Job.get()
    const profile = Profile.get()

    const updatedJobs = jobs.map( (job) => {
      const remaining = JobUtils.remainingDays(job)
      const status = remaining <= 0 ? 'done' : 'progress'
      // ...job + incremento
      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile['hour-value'])
      }
    })

    return res.render('index', { jobs: updatedJobs })

  },
  create(req, res) {
    return res.render('job')
  },
  post(req, res) {
    const lastId = Job.data[Job.data.length - 1]?.id || 0
    Job.data.push({
      id: lastId + 1,
      name: req.body.name,
      "daily-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"],
      created_at: Date.now()
    })
    return res.redirect('/')
  },
  show(req, res) {
    const jobId = req.params.id
    const job = Job.data.find(job => Number(job.id) === Number(jobId))
    if (!job) {
      return res.send('Job not found!')
    }
    job.budget = Job.services.calculateBudget(job, Profile.data['hour-value'])
    return res.render('job-edit', { job })
  },
  update(req, res) {
    const newData = req.body
    const jobId = req.params.id
    const job = Job.data.find(job => Number(job.id) === Number(jobId))
    if (!job) {
      return res.send('Job not found!')
    }

    const updatedJob = {
      ...job,
      name: newData.name,
      'total-hours': newData['total-hours'],
      'daily-hours': newData['daily-hours']
    }
    Job.data = Job.data.map(job => {
      if (Number(job.id) === Number(jobId)) {
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
}
