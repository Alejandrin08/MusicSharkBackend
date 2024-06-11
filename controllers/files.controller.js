const { file } = require('../models')
const fs = require("fs")

let self = {}

// GET: api/file
self.getAll = async function (req, res) {
    try {
        let data = await file.findAll({ attributes: [['id', 'fileid'], 'mime', 'indb', 'name', 'size'] })
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(error)
    }
}

// GET: api/file/:id/details
self.getDetails = async function (req, res) {
    try {
        let id = req.params.id;

        if (!id || isNaN(id) || !Number.isInteger(Number(id))) {
            return res.status(400).json({ error: 'ID inválido' });
        }

        let data = await file.findByPk(id, { attributes: [['id', 'fileid'], 'mime', 'indb', 'name', 'size'] });
        if (data) {
            return res.status(200).json(data);
        } else {
            return res.status(404).send();
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

// GET: api/file/:id
self.get = async function (req, res) {
    try {
        let id = req.params.id;

        if (!id || isNaN(id) || !Number.isInteger(Number(id))) {
            return res.status(400).json({ error: 'ID inválido' });
        }

        let data = await file.findByPk(id);
        if (!data) {
            return res.status(404).send();
        }

        let image = data.data;
        if (!data.indb) {
            image = fs.readFileSync("uploads/" + data.name);
        }

        return res.status(200).contentType(data.mime).send(image);
    } catch (error) {
        return res.status(500).json(error);
    }
}

// POST: api/file
self.create = async function (req, res) {
    try {
        if (req.file == undefined) return res.status(400).json('El archivo es obligatorio.');

        let binary = null;
        let indb = false;
        if (process.env.FILES_IN_BD == "true") {
            binary = fs.readFileSync("uploads/" + req.file.filename)
            fs.existsSync("uploads/" + req.file.filename) && fs.unlinkSync("uploads/" + req.file.filename)
            indb = true;
        }
        let dataFile = await file.create({
            mime: req.file.mimetype,
            indb: indb,
            name: req.file.filename,
            size: req.file.size,
            data: binary
        })

        req.logbook("archivos.crear", dataFile.id)
        
        return res.status(201).json({
            id: dataFile.id,
            mime: req.file.mimetype,
            indb: indb,
            name: req.file.filename
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

// PUT: api/file/:id
self.update = async function (req, res) {
    try {
        if (req.file == undefined) return res.status(400).json('El archivo es obligatorio.');

        let id = req.params.id;

        if (!id || isNaN(id) || !Number.isInteger(Number(id))) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        let image = await file.findByPk(id);
        if (!image) {
            if (fs.existsSync("uploads/" + req.file.filename)) {
                fs.unlinkSync("uploads/" + req.file.filename);
            }
            return res.status(404).send();
        }

        let binary = null;
        let indb = false;
        if (process.env.FILES_IN_BD == "true") {
            binary = fs.readFileSync("uploads/" + req.file.filename);
            if (fs.existsSync("uploads/" + req.file.filename)) {
                fs.unlinkSync("uploads/" + req.file.filename);
            }
            indb = true;
        }

        let dataFile = await file.update({
            mime: req.file.mimetype,
            indb: indb,
            name: req.file.filename,
            size: req.file.size,
            data: binary
        }, { where: { id: id } });

        req.logbook("archivos.editar", id);

        if (dataFile[0] === 0) {
            return res.status(404).send();
        }

        if (!image.indb) {
            if (fs.existsSync("uploads/" + image.name)) {
                fs.unlinkSync("uploads/" + image.name);
            }
        }

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json(error);
    }
}

// DELETE: api/file/5
self.delete = async function (req, res) {
    try {
        const id = req.params.id;

        if (!id || isNaN(id) || !Number.isInteger(Number(id))) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        let image = await file.findByPk(id);
        if (!image) {
            return res.status(404).send();
        }

        let data = await file.destroy({ where: { id: id } });
        if (data === 1) {
            req.logbook("archivos.eliminar", id);
            
            if (!image.indb) {
                if (fs.existsSync("uploads/" + image.name)) {
                    fs.unlinkSync("uploads/" + image.name);
                }
            }
            return res.status(204).send();
        }
        return res.status(404).send();
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = self