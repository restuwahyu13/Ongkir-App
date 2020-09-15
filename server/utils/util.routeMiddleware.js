const authRoute = require('../routes/route.auth')
const ongkirRoute = require('../routes/route.ongkir')
const socialAuthRoute = require('../routes/route.authsc')
const profileRoute = require('../routes/route.profile')

module.exports = (app) => {
  app.use(socialAuthRoute)
  app.use('/api', authRoute)
  app.use('/api', ongkirRoute)
  app.use('/api', profileRoute)
}
