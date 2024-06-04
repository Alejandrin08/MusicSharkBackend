const router = require('express').Router()
const song = require('../controllers/song.controller')
const Authorize = require('../middlewares/auth.middleware')

// GET: api/song
router.get('/', Authorize('Usuario,Administrador'), song.getAll)

// GET: api/song/5
router.get('/:id', Authorize('Usuario,Administrador'), song.get)

// POST: api/song
router.post('/', Authorize('Administrador'), song.create)

// PUT: api/song/5
router.put('/:id', Authorize('Administrador'), song.update)

// DELETE: api/song/5
router.delete('/:id', Authorize('Administrador'), song.delete)

// POST: api/song/5/musicgenre
router.post('/:id/musicgenre', Authorize('Administrador'), song.assignMusicgenre);

// DELETE: api/song/5/musicgenre/1
router.delete('/:id/musicgenre/:musicgenreid', Authorize('Administrador'), song.deleteMusicgenre);

module.exports = router