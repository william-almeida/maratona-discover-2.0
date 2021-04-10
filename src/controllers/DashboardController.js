const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
  async index(req, res) {
    const jobs = await Job.get()
    const profile = await Profile.get()
    let jobTotalHours = 0
    let statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length

    }
    const updatedJobs = jobs.map( (job) => {
      const remaining = JobUtils.remainingDays(job)
      const status = remaining <= 0 ? 'done' : 'progress'
      statusCount[status] += 1
      
      if (status === 'progress'){
        jobTotalHours += Number(job['daily-hours']) 
      }
      // ...job + incremento
      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile['hour-value'])
      }
    })

    const freeHours = profile['hours-per-day'] - jobTotalHours

    return res.render('index', { jobs: updatedJobs, profile: profile, statusCount: statusCount, freeHours: freeHours })

  }
}