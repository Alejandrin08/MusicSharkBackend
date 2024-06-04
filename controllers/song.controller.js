const { song, musicgenre, Sequelize } = require('../models')
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
        let data = await song.create({
            title: req.body.title,
            artist: req.body.artist,
            album: req.body.album,
            duration: req.body.duration || '00:00:00',
            fileid: req.body.fileid || null
        })
        req.logbook("song.crear", data.id)
        return res.status(201).json(data)
    } catch (error) {
        return res.status(500).json(error)
    }
}



self.update = async function (req, res) {
    try {
        let id = req.params.id;
        let { title, artist, album, duration } = req.body;

        let updateFields = {};
        if (title !== undefined) updateFields.title = title;
        if (artist !== undefined) updateFields.artist = artist;
        if (album !== undefined) updateFields.album = album;
        if (duration !== undefined) updateFields.duration = duration;

        
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

// POST: api/song/5/musicgenre/1
self.assignMusicgenre = async function (req, res) {
    try {
        let itemToAssign = await musicgenre.findByPk(req.body.musicgenreid);
        if (!itemToAssign) return res.status(404).send()

        let item = await song.findByPk(req.params.id);
        if (!item) return res.status(404).send()

        await item.addMusicgenre(itemToAssign)
        req.logbook("songmusicgenre.agregar", `${req.params.id}:${req.body.musicgenreid}`)
        return res.status(204).send()
    } catch (error) {
        return res.status(500).json(error)
    }
}

// DELETE: api/song/5/musicgenre/1
self.deleteMusicgenre = async function (req, res) {
    try {
        let itemToRemove = await musicgenre.findByPk(req.params.musicgenreid);
        if (!itemToRemove) return res.status(404).send()

        let item = await song.findByPk(req.params.id);
        if (!item) return res.status(404).send()

        await item.removeMusicgenre(itemToRemove)
        req.logbook("songmusicgenre.remover", `${req.params.id}:${req.body.musicgenreid}`)
        return res.status(204).send()
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = self