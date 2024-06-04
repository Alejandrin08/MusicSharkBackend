const router = require('express').Router()
const logbook = require('../controllers/logbook.controller')
const Authorize = require('../middlewares/auth.middleware')

// GET: api/logbook
router.get('/', Authorize('Administrador'), logbook.getAll)

module.exports = router