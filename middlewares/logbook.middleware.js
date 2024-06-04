const jwt = require('jsonwebtoken')
const requestIp = require('request-ip');
const ClaimTypes = require('../config/claimtypes')
const { logbook } = require('../models')

const logbooklogger = (req, res, next) => {
    const ip = requestIp.getClientIp(req)
    let email = 'invitado'

    req.logbook = async (action, id) => {
        const authHeader = req.header('Authorization')
        if (authHeader) {
            if (authHeader.startsWith('Bearer ')) {
                const token = authHeader.split(' ')[1]
                const decodedToken = jwt.decode(token)
                email = decodedToken[ClaimTypes.Name] ?? id
            }
        }

        await logbook.create({
            action: action, idelement: id, ip: ip, user: email, date: new Date()
        })
    }
    next()
}

module.exports = logbooklogger