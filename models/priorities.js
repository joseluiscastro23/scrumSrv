const table = 'tbl_priority';
const allFields = ['priority_id as id', 'priority_nm as name', 'priority_value as value'];
const idField = 'priority_id';
const dbSettings = require('../dbSettings');
const db = require('knex')(dbSettings.dbScrumSettings);

module.exports = {
    getAll: (fields) => {

        console.assert(!fields || fields instanceof Array, 'Fields must be an Array.');
        return db.select(fields || allFields).from(table);
    },

    getById: (id, fields) => {

        console.assert(!fields || fields instanceof Array, 'Fields must be an Array.');
        return db.select(fields || allFields).from(table).where(idField, id);
    },

    create: (priority) => {

        return db.insert([{ priority_nm: priority.name, priority_value: priority.value }], allFields).into(table);
    },

    update: (id, priority) => {

        return db(table).where(idFild, id).update({ priority_nm: priority.name, priority_value: priority.value }, allFields);
    },

    delete: (id) => {

        return db(table).where(idFields, id).del();
    }
};