let data = [
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
]

module.exports = {
  get() {
    return data
  },
  update(newJob) {
    data = newJob
  },
  delete(id) {
    data = data.filter(job => Number(job.id) !== Number(id))
  }
}