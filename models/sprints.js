const table = 'tbl_sprint';
const allFields = ['sprint_id as id', 'sprint_nm as name', 'sprint_start_date as start_date', 'sprint_done_date as done_date', 'user_id as user_id'];
const idField = 'sprint_id';
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

    create: (sprint) => {

        return db.insert([{ sprint_nm: sprint.name, sprint_start_date: sprint.start_date, sprint_done_date: sprint.done_date, user_id: sprint.user_id }], allFields).into(table);
    },

    update: (id, sprint) => {

        return db(table).where(idField, id).update({ sprint_nm: sprint.name, sprint_start_date: sprint.start_date, sprint_done_date: sprint.done_date, user_id: sprint.user_id }, allFields);
    },

    delete: (id) => {

        return db(table).where(idField, id).del();
    }
};
