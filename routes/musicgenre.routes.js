const router = require('express').Router()
const musicgenre = require('../controllers/musicgenre.controller')
const Authorize = require('../middlewares/auth.middleware')

// GET: api/musicgenre
router.get('/', Authorize('Administrador'), musicgenre.getAll)

// GET: api/musicgenre/5
router.get('/:id', Authorize('Administrador'), musicgenre.get)

// POST: api/musicgenre
router.post('/', Authorize('Administrador'), musicgenre.create)

// PUT: api/musicgenre/5
router.put('/:id', Authorize('Administrador'), musicgenre.update)

// DELETE: api/musicgenre/5
router.delete('/:id', Authorize('Administrador'), musicgenre.delete)

module.exports = router