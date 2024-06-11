const { song, musicgenre, file, Sequelize } = require('../models')
const {Op} = require ('sequelize');

let self = {}

// GET: api/song
self.getAll = async function (req, res) {

    const { s } = req.query;
    let filters = {};

    if (s && s.trim() !== '') {
        filters = {
            title: {
                [Op.like]: `%${s.trim()}%`
            }
        };
    }
    try {
        let data = await song.findAll({
            where: filters,
            attributes: [['id', 'songid'], 'title', 'artist', 'album', 'duration', 'fileid'],
            include: {
                model: musicgenre,
                as: 'musicgenres',
                attributes: [['id', 'musicgenreid'], 'name', 'protected'],
                through: { attributes: [] }
            },
            subQuery: false
        })
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(error)
    }
}

// GET: api/song/5
self.get = async function (req, res) {
    try {
        let id = req.params.id
        if (!id || isNaN(id) || !Number.isInteger(Number(id))) {
            return res.status(400).json({ error: 'ID inválido.' });
        }
        let data = await song.findByPk(id, {
            attributes: [['id', 'songid'], 'title', 'artist', 'album', 'duration', 'fileid'],
            include: {
                model: musicgenre,
                as: 'musicgenres',
                attributes:[['id', 'musicgenreid'], 'name', 'protected'],
                through: { attributes: [] }
            }
        })
        if (data)
            return res.status(200).json(data)
        else
            return res.status(404).send()
    } catch (error) {
        return res.status(500).json(error)
    }
}

// POST: api/song
self.create = async function (req, res) {
    try {
        const { title, artist, album, duration, fileid } = req.body;
        if (!title || !artist || !album || title.length > 75 || artist.length > 75 || album.length > 75) {
            return res.status(400).json({ mensaje: 'Los campos no son validos.' });
        }

        let fileId = null;
        if (fileid) {
            if (!(/^\d+$/.test(fileid))) {
                fileId = null;
            } else {
                const fileExists = await file.findByPk(fileid);
                fileId = fileExists ? fileid : null;
            }
        }

        const durationRegex = /^\d{2}:\d{2}:\d{2}$/;
        const isValidDuration = durationRegex.test(duration);
        const finalDuration = isValidDuration ? duration : '00:00:00';

        let data = await song.create({
            title: title,
            artist: artist,
            album: album,
            duration: finalDuration,
            fileid: fileId
        });

        req.logbook("song.crear", data.id);
        return res.status(201).json(data);
    } catch (error) {
        return res.status(500).json(error);
    }
}

self.update = async function (req, res) {
    try {
        let id = req.params.id;
        if (!id || isNaN(id) || !Number.isInteger(Number(id))) {
            return res.status(400).json({ error: 'ID inválido.' });
        }
        let { title, artist, album, duration, fileid } = req.body;
        if (!title || !artist || !album || title.length > 75 || artist.length > 75 || album.length > 75) {
            return res.status(400).json({ mensaje: 'Los campos no son validos.' });
        }

        const durationRegex = /^\d{2}:\d{2}:\d{2}$/;
        const isValidDuration = durationRegex.test(duration);
        const finalDuration = isValidDuration ? duration : '00:00:00';

        let fileId = null;
        if (fileid) {
            if (!(/^\d+$/.test(fileid))) {
                fileId = null;
            } else {
                const fileExists = await file.findByPk(fileid);
                fileId = fileExists ? fileid : null;
            }
        }

        let updateFields = {};
        if (title !== undefined) updateFields.title = title;
        if (artist !== undefined) updateFields.artist = artist;
        if (album !== undefined) updateFields.album = album;
        if (finalDuration !== undefined) updateFields.duration = finalDuration;
        if (fileId !== undefined) updateFields.fileid = fileId;

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ message: "No fields to update" });
        }

        let data = await song.update(updateFields, { where: { id: id } });

        if (data[0] === 0) {
            return res.status(404).send();
        }

        req.logbook("song.editar", id);
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json(error);
    }
}

self.patch = async function (req, res) {
    try {
        let id = req.params.id
        if (!id || isNaN(id) || !Number.isInteger(Number(id))) {
            return res.status(400).json({ error: 'ID inválido.' });
        }
        let body = req.body
        let data = await song.update(body, { where: { id: id } })
        if (data[0] === 0)
            return res.status(404).send()
        
        req.logbook("song.editar", id)
        return res.status(204).send()
    } catch (error) {
        return res.status(500).json(error)
    }
}

// DELETE: api/song/5
self.delete = async function (req, res) {
    try {
        let id = req.params.id
        if (!id || isNaN(id) || !Number.isInteger(Number(id))) {
            return res.status(400).json({ error: 'ID inválido.' });
        }
        let data = await song.findByPk(id)
        if (!data)
            return res.status(404).send()

        data = await song.destroy({ where: { id: id } })
        if (data === 1) {
            req.logbook("song.eliminar", id)
            return res.status(204).send()
        }
        return res.status(404).send()
    } catch (error) {
        return res.status(500).json(error)
    }
}

// POST: api/song/:id/musicgenre/:musicgenreid
self.assignMusicgenre = async function (req, res) {
    try {
        const { id } = req.params;
        const { musicgenreid } = req.body;

        if (!id || isNaN(id) || !Number.isInteger(Number(id))) {
            return res.status(400).json({ error: 'ID invalido.' });
        }

        if (!musicgenreid || isNaN(musicgenreid) || !Number.isInteger(Number(musicgenreid))) {
            return res.status(400).json({ error: 'ID invalido.' });
        }

        let itemToAssign = await musicgenre.findByPk(musicgenreid);
        if (!itemToAssign) return res.status(404).send();

        let item = await song.findByPk(id);
        if (!item) return res.status(404).send();

        await item.addMusicgenre(itemToAssign);
        req.logbook("songmusicgenre.agregar", `${id}:${musicgenreid}`);
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json(error);
    }
}

// DELETE: api/song/:id/musicgenre/:musicgenreid
self.deleteMusicgenre = async function (req, res) {
    try {
        const { id, musicgenreid } = req.params;
        if (!id || isNaN(id) || !Number.isInteger(Number(id)) || 
            !musicgenreid || isNaN(musicgenreid) || !Number.isInteger(Number(musicgenreid))) {
            return res.status(400).json({ error: 'Los IDs deben ser números enteros.' });
        }

        let itemToRemove = await musicgenre.findByPk(musicgenreid);
        if (!itemToRemove) return res.status(404).send();

        let item = await song.findByPk(id);
        if (!item) return res.status(404).send();

        await item.removeMusicgenre(itemToRemove);
        req.logbook("songmusicgenre.remover", `${id}:${musicgenreid}`);
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = self