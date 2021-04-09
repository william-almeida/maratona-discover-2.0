const Profile = require('../model/Profile')

module.exports = {
  async index(req, res) {
    profile = await Profile.get()
    return res.render('profile', { profile: profile })
  },
  async update(req, res) {
    const data = req.body
    const weeksPerYear = 52
    const weeksPerMonth = (weeksPerYear - data['vacation-per-year']) / 12
    const weekTotalHours = data['hours-per-day'] * data['days-per-week']
    const monthlyTotalHours = weekTotalHours * weeksPerMonth
    const hourValue = data['monthly-budget'] / monthlyTotalHours
    profile = await Profile.get()
    Profile.update({
      ...profile,
      ...req.body,
      'hour-value': hourValue
    })
    return res.redirect('/profile')
  }
}