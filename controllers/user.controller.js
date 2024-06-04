const { user, role, Sequelize } = require('../models')
const bcrypt = require('bcrypt')
const crypto = require('crypto')

let self = {}

// GET: api/user
self.getAll = async function (req, res) {
    const data = await user.findAll({
        raw: true,
        attributes: ['id', 'email', 'name', [Sequelize.col('role.name'), 'role']],
        include: { model: role, attributes: [] }
    })
    return res.status(200).json(data)
}

// GET: api/user/email
self.get = async function (req, res) {
    const email = req.params.email
    const data = await user.findOne({
        where: { email: email },
        raw: true,
        attributes: ['id', 'email', 'name', [Sequelize.col('role.name'), 'role']],
        include: { model: role, attributes: [] }
    })
    if (data)
        return res.status(200).json(data)

    return res.status(404).send()
}

// POST: api/user
self.create = async function (req, res) {
    try {
        const roleuser = await role.findOne({ where: { name: req.body.role } })

        const data = await user.create({
            id: crypto.randomUUID(),
            email: req.body.email,
            passwordhash: await bcrypt.hash(req.body.password, 10),
            name: req.body.name,
            roleid: roleuser.id
        })
        req.logbook("usuarios.crear", data.email)
        return res.status(201).json({
            id: data.id,
            email: data.email,
            name: data.name,
            roleid: roleuser.name
        })
    } catch (error) {
        return res.status(400).send(error)
    }
}

// PUT: api/user/email
self.update = async function (req, res) {
    const email = req.params.email
    const roleuser = await role.findOne({ where: { name: req.body.role } })
    req.body.roleid = roleuser.id

    const data = await user.update(req.body, {
        where: { email: email },
    })
    if (data[0] === 0)
        return res.status(404).send()
    req.logbook("usuarios.editar", email)
    return res.status(204).send()
}

// DELETE: api/user/email
self.delete = async function (req, res) {
    const email = req.params.email
    let data = await user.findOne({ where: { email: email } })
    
    if (data.protected) return res.status(403).send()

    data = await user.destroy({ where: { email: email } })
    if (data === 1) {
        req.logbook("usuarios.eliminar", email)
        return res.status(204).send()   
    }

    return res.status(400).send()
}

module.exports = self