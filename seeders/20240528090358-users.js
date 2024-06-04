'use strict';
const bcrypt = require('bcrypt')
const crypto = require('crypto')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        const AdministradorUUID = crypto.randomUUID()
        const UsuarioUUID = crypto.randomUUID()

        await queryInterface.bulkInsert('role', [
            { id: AdministradorUUID, name: 'Administrador', createdAt: new Date(), updatedAt: new Date() },
            { id: UsuarioUUID, name: 'Usuario', createdAt: new Date(), updatedAt: new Date() }
        ]);

        await queryInterface.bulkInsert('user', [
            { id: crypto.randomUUID(), email: 'closirissystem@gmail.com', passwordhash: await bcrypt.hash('123Closiris_', 10), name: 'Closiris', roleid: AdministradorUUID, protected: true, createdAt: new Date(), updatedAt: new Date() },
            { id: crypto.randomUUID(), email: 'alexsandermarin@outlook.com', passwordhash: await bcrypt.hash('123Ale_', 10), name: 'Alejandro', roleid: UsuarioUUID, createdAt: new Date(), updatedAt: new Date() },
            { id: crypto.randomUUID(), email: 'momaosiris@gmail.com', passwordhash: await bcrypt.hash('123Pal#', 10), name: 'Paloma', roleid: UsuarioUUID, createdAt: new Date(), updatedAt: new Date() }
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('role', null, {})
        await queryInterface.bulkDelete('user', null, {})
    }
};