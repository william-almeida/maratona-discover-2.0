const Database = require('../db/config')

module.exports = {
  async get(){
    const db = await Database()
    // * select all
    const data = await db.get(`SELECT * FROM profile`)

    await db.close()
    
    return {
      name: data.name,
      avatar: data.avatar,
      "monthly-budget": data.monthly_budget,
      "hours-per-day": data.hours_per_day,
      "days-per-week": data.days_per_week,
      "vacation-per-year": data.vacation_per_year,
      "hour-value": data.hour_value
    }
  },
  async update(newData){
    const db = await Database()
    // * select all
    db.run(`UPDATE profile SET 
      name = '${newData.name}',
      avatar = '${newData.avatar}',
      monthly_budget = ${newData["monthly-budget"]},
      hours_per_day = ${newData["hours-per-day"]},
      days_per_week = ${newData["days-per-week"]},
      vacation_per_year = ${newData["vacation-per-year"]},
      hour_value = ${newData["hour-value"]}
    `)

    await db.close()
  }
}
