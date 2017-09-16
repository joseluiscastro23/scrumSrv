const table = 'tbl_project';
const allFields = ['project_id as id', 'project_nm as name'];
const idField = 'project_id';
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

    create: (project) => {

        return db.insert([{ priority_nm: project.name, priority_value: project.value }], allFields).into(table);
    },

    update: (id, project) => {

        return db(table).where(idField, id).update({ priority_nm: project.name, priority_value: project.value }, allFields);
    },

    delete: (id) => {

        return db(table).where(idField, id).del();
    }
};
