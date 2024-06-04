const { musicgenre } = require('../models')

let self = {}

// GET: api/musicgenre
self.getAll = async function (req, res) {
    try {
        let data = await musicgenre.findAll({ attributes: [['id', 'musicgenreid'], 'name', 'protected'] })
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(error)
    }
}

// GET: api/musicgenre/5
self.get = async function (req, res) {
    try {
        let id = req.params.id
        let data = await musicgenre.findByPk(id, { attributes: [['id', 'musicgenreid'], 'name', 'protected'] })
        if (data)
            return res.status(200).json(data)
        else
            return res.status(404).send()
    } catch (error) {
        return res.status(500).json(error)
    }
}

// POST: api/musicgenre
self.create = async function (req, res) {
    try {
        let data = await musicgenre.create({
            name: req.body.name
        })
        req.logbook("musicgenre.crear", data.id)
        return res.status(201).json(data)
    } catch (error) {
        return res.status(500).json(error)
    }
}

// PUT: api/musicgenre/5
self.update = async function (req, res) {
    try {
        let id = req.params.id
        let body = req.body
        let data = await musicgenre.update(body, { where: { id: id } })
        if (data[0] === 0)
            return res.status(404).send()

        req.logbook("musicgenre.editar", id)
        return res.status(204).send()
    } catch (error) {
        return res.status(500).json(error)
    }
}

// DELETE: api/musicgenre/5
self.delete = async function (req, res) {
    try {
        const id = req.params.id
        let data = await musicgenre.findByPk(id)
        if (!data)
            return res.status(404).send()
        
        if (data.protected)
            return res.status(400).send()

        data = await musicgenre.destroy({ where: { id: id } })
        if (data === 1) {
            req.logbook("musicgenre.eliminar", id)
            return res.status(204).send()
        }
        return res.status(404).send()
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = self