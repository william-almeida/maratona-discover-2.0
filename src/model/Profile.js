let data = {
  name: "William Almeida",
  avatar: `https:github.com/william-almeida.png`,
  "monthly-budget": 3500,
  "hours-per-day": 3,
  "days-per-week": 5,
  "vacation-per-year": 4,
  "hour-value": 50
}

module.exports = {
  get(){
    return data
  },
  update(newData){
    data = newData
    return data
  }
}
