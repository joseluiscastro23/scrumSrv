const table = 'tbl_project';
const allFields = ['project_id as id', 'project_nm as name', 'project_date as date', 'project_description as description'];
const idField = 'project_id';
const db = require('./dbConnection');

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
