const table = 'tbl_feature';
const allFields = ['feature_id as id', 'feature_nm as name', 'feature_acceptance_criteria as acceptance_criteria', 'feature_discussion as discussion', 'feature_state_id as state_id', 'user_id as user_id', 'feature_target_date as target_date', 'feature_priority as priority', 'feature_effort as effort', 'feature_business_value as business_value', 'feature_time_criticality as time_criticality', 'value_area_id as value_area_id', 'feature_tags as tags', 'feature_date as date', 'sprint_id as sprint_id', 'project_id as project_id'];
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

    create: (feature) => {

        return db.insert([{ feature_nm: feature.name, feature_acceptance_criteria: feature.acceptance_criteria, feature_discussion: feature.discussion, feature_state_id: feature.state_id, user_id: feature.user_id, feature_target_date: feature.target_date, feature_priority: feature.priority, feature_effort: feature.effort, feature_business_value: feature.business_value, feature_time_criticality: feature.time_criticality, value_area_id: feature.value_area_id, feature_tags: feature.tags, feature_date: feature.date, sprint_id: feature.sprint_id, project_id: feature.project_id }], allFields).into(table);
    },

    update: (id, feature) => {

        return db(table).where(idField, id).update({ feature_nm: feature.name, feature_acceptance_criteria: feature.acceptance_criteria, feature_discussion: feature.discussion, feature_state_id: feature.state_id, user_id: feature.user_id, feature_target_date: feature.target_date, feature_priority: feature.priority, feature_effort: feature.effort, feature_business_value: feature.business_value, feature_time_criticality: feature.time_criticality, value_area_id: feature.value_area_id, feature_tags: feature.tags, feature_date: feature.date, sprint_id: feature.sprint_id, project_id: feature.project_id }, allFields);
    },

    delete: (id) => {

        return db(table).where(idField, id).del();
    }
};
