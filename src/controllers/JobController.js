const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')


module.exports = {
  // this method opens the form to create a new job
  create(req, res) {
    return res.render('job')
  },
  // this method gets the job information on form
  // and adds the job on array
  async save(req, res) {
    await Job.create({
      name: req.body.name,
      "daily-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"],
      created_at: Date.now()
    })
    return res.redirect('/')
  },
  
  async show(req, res) {
    const jobId = req.params.id
    const jobs = await Job.get()
    const profile = await Profile.get()

    // search job by JobID (url params)
    const job = jobs.find(job => Number(job.id) === Number(jobId))
    if (!job) {
      return res.send('Job not found!')
    }
    job.budget = JobUtils.calculateBudget(job, profile['hour-value'])
    return res.render('job-edit', { job })
  },

  async update(req, res) {
    // data send by form 
    const newData = req.body
    const jobId = req.params.id
    
    const updatedJob = {
      name: newData.name,
      'total-hours': newData['total-hours'],
      'daily-hours': newData['daily-hours']
    }
    
    await Job.update(updatedJob, jobId)

    return res.redirect('/job/' + jobId)
  },

  async delete(req, res) {
    const jobId = req.params.id
    await Job.delete(jobId)
    return res.redirect('/')
  }
}
