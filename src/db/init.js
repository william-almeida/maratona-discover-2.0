const Database = require('./config')

const intiDb = {
  async init(){
    const db = await Database()

    await db.exec(`CREATE TABLE profile (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      avatar TEXT,
      monthly_budget INT,
      hours_per_day INT,
      days_per_week INT,
      vacation_per_year INT,
      hour_value INT
    )`)

    await db.exec(`CREATE TABLE jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      daily_hours INT,
      tota_hours INT,
      created_at DATETIME
    )`)

    await db.run(`INSERT INTO profile (
      name,
      avatar,
      monthly_budget,
      hours_per_day,
      days_per_week,
      vacation_per_year,
      hour_value
    ) VALUES (
      "William Almeida",
      "https://github.com/william-almeida.png",
      400,
      5,
      5,
      75,
      2
    );`)

    await db.run(`INSERT INTO jobs (
      name,
      daily_hours,
      tota_hours,
      created_at
    ) VALUES (
      "Maratona Discover",
      3,
      20,
      1617985358179
    );`)

    await db.run(`INSERT INTO jobs (
      name,
      daily_hours,
      tota_hours,
      created_at
    ) VALUES (
      "Github Profile",
      2,
      1,
      1617900058179
    );`)

    // Closing db
    await db.close()

  }

    // Openning db
    
}

intiDb.init()
