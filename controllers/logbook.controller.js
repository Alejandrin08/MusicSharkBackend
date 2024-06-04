const { logbook } = require('../models')

let self = {}

// GET: api/logbook
self.getAll = async function (req, res, next) {
    let data = await logbook.findAll({
        attributes: [['id', 'logbookid'], 'action', 'idelement', 'ip', 'user', 'date'],
        order: [['id', 'DESC']],
    })
    return res.status(200).json(data)
}

module.exports = self