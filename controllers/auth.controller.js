const bcrypt = require('bcrypt')
const { user, role, Sequelize } = require('../models')
const { GenerateToken, RemainingTime } = require('../services/jwttoken.service')

let self = {}

// POST: api/auth
const MAX_EMAIL_LENGTH = 75;
const MAX_PASSWORD_LENGTH = 20;

self.login = async function (req, res) {
    const { email, password } = req.body;

    try {
        if (email.length > MAX_EMAIL_LENGTH || password.length > MAX_PASSWORD_LENGTH) {
            return res.status(400).json({ mensaje: 'Usuario o contraseña incorrectos. ' });
        }

        let data = await user.findOne({
            where: { email: email },
            raw: true,
            attributes: ['id', 'email', 'name', 'passwordhash', [Sequelize.col('role.name'), 'role']],
            include: { model: role, attributes: [] }
        });

        if (data === null)
            return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos.' });

        const passwordMatch = await bcrypt.compare(password, data.passwordhash);
        if (!passwordMatch)
            return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos.' });

        token = GenerateToken(data.email, data.name, data.role);

        req.logbook("usuario.login", data.email);

        return res.status(200).json({
            email: data.email,
            name: data.name,
            role: data.role,
            jwt: token
        });
    } catch (error) {
        return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos.' });
    }
}

// GET: api/auth/time
self.time = async function (req, res) {
    const time = RemainingTime(req)
    if (time == null)
        return res.status(404).send()
    return res.status(200).send(time)
}

module.exports = self