const router = require('express').Router()
const role = require('../controllers/role.controller')
const Authorize = require('../middlewares/auth.middleware')

// GET: api/role
router.get('/', Authorize('Administrador'), role.getAll)

module.exports = router