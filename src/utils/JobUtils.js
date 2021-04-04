module.exports = {
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
