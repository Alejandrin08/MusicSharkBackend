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

const EMAIL_REGEX = /^[a-z0-9._%+-]+@(uv\.mx|estudiantes\.uv\.mx|gmail\.com|hotmail\.com|outlook\.com|edu\.mx)$/;
const MAX_EMAIL_LENGTH = 75;

self.get = async function (req, res) {
    try {
        const email = req.params.email;

        if (email.length > MAX_EMAIL_LENGTH) {
            return res.status(400).json({ error: 'Correo invalido.' });
        }

        if (!EMAIL_REGEX.test(email)) {
            return res.status(400).json({ error: 'Correo invalido.' });
        }

        const data = await user.findOne({
            where: { email: email },
            raw: true,
            attributes: ['id', 'email', 'name', [Sequelize.col('role.name'), 'role']],
            include: { model: role, attributes: [] }
        });

        if (data) {
            return res.status(200).json(data);
        }

        return res.status(404).send();
    } catch (error) {
        return res.status(500).json(error);
    }
}

// POST: api/user
self.create = async function (req, res) {
    try {
        const email = req.body.email;
        const EMAIL_REGEX = /^[a-z0-9._%+-]+@(uv\.mx|estudiantes\.uv\.mx|gmail\.com|hotmail\.com|outlook\.com|edu\.mx)$/i;
        if (!email || email.length > 75 || !EMAIL_REGEX.test(email)) {
            return res.status(400).json({ error: 'El correo electrónico no es válido.' });
        }

        const existingUser = await user.findOne({ where: { email: email } });
        if (existingUser) {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
        }

        const password = req.body.password;
        const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%?&])[A-Za-z\d$@$!%?&]{8,15}$/;
        if (!password || password.length > 15 || !PASSWORD_REGEX.test(password)) {
            return res.status(400).json({ error: 'La contraseña no es válida.' });
        }

        const name = req.body.name;
        if (!name || name.length > 100) {
            return res.status(400).json({ error: 'El nombre no es válido.' });
        }

        const roleInput = req.body.role;
        if (!roleInput || (roleInput !== 'Usuario' && roleInput !== 'Administrador')) {
            return res.status(400).json({ error: 'El rol no es válido.' });
        }

        const roleuser = await role.findOne({ where: { name: roleInput } });
        if (!roleuser) {
            return res.status(400).json({ error: 'El rol especificado no existe.' });
        }

        const data = await user.create({
            id: crypto.randomUUID(),
            email: email,
            passwordhash: await bcrypt.hash(password, 10),
            name: name,
            roleid: roleuser.id
        });

        req.logbook("usuarios.crear", data.email);
        return res.status(201).json({
            id: data.id,
            email: data.email,
            name: data.name,
            roleid: roleInput
        });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

// PUT: api/user/email
self.update = async function (req, res) {
    try {
        const emailParam = req.params.email;
        const name = req.body.name;
        const roleInput = req.body.role;

        if (!name || name.trim() === '' || name.length > 100) {
            return res.status(400).json({ error: 'El nombre no es válido.' });
        }

        if (!roleInput || (roleInput !== 'Usuario' && roleInput !== 'Administrador')) {
            return res.status(400).json({ error: 'El rol no es válido.' });
        }

        const roleuser = await role.findOne({ where: { name: roleInput } });
        if (!roleuser) {
            return res.status(400).json({ error: 'El rol especificado no existe.' });
        }

        req.body.roleid = roleuser.id;

        const data = await user.update(req.body, {
            where: { email: emailParam },
        });

        if (data[0] === 0) {
            return res.status(404).send();
        }

        req.logbook("usuarios.editar", emailParam);
        return res.status(204).send();
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

// DELETE: api/user/email
self.delete = async function (req, res) {
    try {
        const email = req.params.email;

        const EMAIL_REGEX = /^[a-z0-9._%+-]+@(uv\.mx|estudiantes\.uv\.mx|gmail\.com|hotmail\.com|outlook\.com|edu\.mx)$/i;
        if (!EMAIL_REGEX.test(email)) {
            return res.status(400).json({ error: 'El correo electrónico no es válido.' });
        }

        let data = await user.findOne({ where: { email: email } });
        if (!data) {
            return res.status(404).send();
        }
        
        if (data.protected) {
            return res.status(403).send();
        }

        data = await user.destroy({ where: { email: email } });
        if (data === 1) {
            req.logbook("usuarios.eliminar", email);
            return res.status(204).send();
        }

        return res.status(400).send();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = self