const sqlite3 = require('sqlite3')
// importing only open functionality
const { open } = require('sqlite')

module.exports = () => {
  open({
    filename: './databasa.sqlite',
    driver: sqlite3.Database
  })
}
