const router = require('express').Router()
const files = require('../controllers/files.controller')
const Authorize = require('../middlewares/auth.middleware')
const upload = require("../middlewares/upload.middleware")

// GET: api/file
router.get('/', Authorize('Administrador'), files.getAll)

// GET: api/file/5
router.get('/:id', files.get)

// GET: api/file/5/details
router.get('/:id/details', Authorize('Administrador'), files.getDetails)

// POST: api/file
router.post('/', upload.single("file"), Authorize('Administrador'), files.create)

// PUT: api/file/5
router.put('/:id', upload.single("file"), Authorize('Administrador'), files.update)

// DELETE: api/file/5
router.delete('/:id', Authorize('Administrador'), files.delete)

module.exports = router