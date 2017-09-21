const table = 'tbl_feature';
const allFields = ['feature_id as id', 'feature_nm as name', 'feature_acceptance_criteria as value'];
const idField = 'feature_id';
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
