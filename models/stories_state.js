const table = 'tbl_story_state';
const allFields = ['story_state_id as id', 'story_state_nm as name'];
const idField = 'story_state_id';
const db = require('./dbConnection');

module.exports = {
    getAll: (fields) => {

        console.assert(!fields || fields instanceof Array, 'Fields must be an Array.');
        return db.select(fields || allFields).from(table);
    },

    getById: (id, fields) => {

        console.assert(!fields || fields instanceof Array, 'Fields must be an Array.');
        return db.select(fields || allFields).from(table).where(idField, id);
    }
};
