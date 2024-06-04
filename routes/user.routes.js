const router = require('express').Router()
const user = require('../controllers/user.controller')
const Authorize = require('../middlewares/auth.middleware')

// GET: api/user
router.get('/', Authorize('Administrador'), user.getAll)

// GET: api/user/email
router.get('/:email', Authorize('Usuario,Administrador'), user.get)

// POST: api/user
router.post('/',  user.create)

// PUT: api/user/email
router.put('/:email', Authorize('Administrador'), user.update)

// DELETE: api/user/email
router.delete('/:email', Authorize('Administrador'), user.delete)

module.exports = router