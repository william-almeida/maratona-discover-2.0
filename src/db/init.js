const Database = require('config')

// Openning db
Database()

Database.exec(`CREATE TABLE profile (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  avatar TEXT,
  monthly_budget INT,
  hours_per_day INT,
  days_per_week INT,
  vacation_per_year INT,
  hour_value INT
)`)

Database.exec(`CREATE TABLE jobs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  daily_hours INT,
  tota_hours INT,
  created_at DATETIME
)`)

Database.run (`INSERT INTO profile (
  name,
  avatar,
  monthly_budget,
  hours_per_day,
  days_per_week,
  vacation_per_year,
  hour_value
) VALUES (
  "William Almeida",
  "https://github.com/william-almedia.png",
  4000,
  5,
  5,
  75
);`)

// Closing db
Database.close()
