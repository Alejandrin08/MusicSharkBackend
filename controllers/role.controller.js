const { role } = require('../models')

let self = {}

// GET: api/role
self.getAll = async function (req, res, next) {
    let data = await role.findAll({ attributes: ['id', 'name'] })
    return res.status(200).json(data)
}

module.exports = self