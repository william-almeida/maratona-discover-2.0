const Database = require('../db/config')

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
  async get() {
    const db = await Database()
    
    const jobs = await db.all(`SELECT * FROM jobs`)
    await db.close
    return jobs.map(job => ({
        id: job.id,
        name: job.name,
        "daily-hours": job.daily_hours,
        "total-hours": job.total_hours,
        created_at: job.created_at
    }))
  },

  async update(newJob) {
    const db = await Database()
    
    // await db.run(`DELETE FROM jobs WHERE id = ${id}`)
    
    await db.close()
  },

  async delete(id) {
    const db = await Database()
    
    await db.run(`DELETE FROM jobs WHERE id = ${id}`)
    
    await db.close()
  },

  async create(newJob){
   const db = await Database() 
   await db.run(`INSERT INTO jobs (
    name,
    daily_hours,
    total_hours,
    created_at
   ) VALUES (
    '${newJob.name}',
    ${newJob["daily-hours"]},
    ${newJob["total-hours"]},
    ${newJob.created_at}
   );`)
   await db.close()
  }
}