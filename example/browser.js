'use strict'
const router = require('nighthawk')()
const routes = require('./routes')

/* Nighthawk
  -- Front-end router. Provides a feature compatible version of express routing for the front-end.
  -- https://github.com/wesleytodd/nighthawk
*/
routes(router)
router.use(function (err, req, res, next) {
  console.error(err)
})
router.listen()
