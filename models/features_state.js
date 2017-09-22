const table = 'tbl_feature_state';
const allFields = ['feature_state_id as id', 'feature_state_nm as name'];
const idField = 'feature_state_id';
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
