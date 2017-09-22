const table = 'tbl_story';
const allFields = ['story_id as id', 'story_nm as name', 'user_id as user_id', 'story_tags as tags', 'story_state_id as state_id', 'story_area as area', 'story_iteration as iteration', 'story_acceptance_criteria as acceptance_criteria', 'story_discussion as discussion', 'story_priority as priority', 'story_effort as effort', 'story_business_value as business_value', 'value_area_id as value_area_id', 'feature_id as feature_id', 'story_date as date', 'sprint_id as sprint_id'];
const idField = 'story_id';
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

    create: (story) => {

        return db.insert([{ story_nm: story.name, user_id: story.user_id, story_tags: story.tags, story_state_id: story.state_id, story_area: story.area, story_iteration: story.iteration, story_acceptance_criteria: story.acceptance_criteria, story_discussion: story.discussion, story_priority: story.priority, story_effort: story.effort, story_business_value: story.business_value, value_area_id: story.value_area_id, feature_id: story.feature_id, story_date: story.date, sprint_id: story.sprint_id }], allFields).into(table);
    },

    update: (id, story) => {

        return db(table).where(idField, id).update({ story_nm: story.name, user_id: story.user_id, story_tags: story.tags, story_state_id: story.state_id, story_area: story.area, story_iteration: story.iteration, story_acceptance_criteria: story.acceptance_criteria, story_discussion: story.discussion, story_priority: story.priority, story_effort: story.effort, story_business_value: story.business_value, value_area_id: story.value_area_id, feature_id: story.feature_id, story_date: story.date, sprint_id: story.sprint_id }, allFields);
    },

    delete: (id) => {

        return db(table).where(idField, id).del();
    }
};
