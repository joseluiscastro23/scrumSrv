const table = 'tbl_task';
const allFields = ['task_id as id', 'task_nm as name', 'user_id as user_id', 'task_tags as tags', 'task_state_id as state_id', 'task_area as area', 'task_iteration as iteration', 'task_discussion as discussion', 'task_priority as priority', 'task_remaining_work as remaining_work', 'task_activity_id as activity_id', 'task_blocked as blocked', 'story_id as story_id', 'sprint_id as sprint_id'];
const idField = 'task_id';
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

    create: (task) => {

        return db.insert([{ task_nm: task.name, user_id: user_id, task_tags: task.tags, task_state_id: task.state_id, task_area: task.area, task_iteration: task.iteration, task_discussion: task.discussion, task_priority: task.priority, task_remaining_work: task.remaining_work, task_activity_id: task.activity_id, task_blocked: task.blocked, story_id: task.story_id, sprint_id: task.sprint_id }]).into(table);
    },

    update: (id, task) => {

        return db(table).where(idField, id).update({ task_nm: task.name, user_id: user_id, task_tags: task.tags, task_state_id: task.state_id, task_area: task.area, task_iteration: task.iteration, task_discussion: task.discussion, task_priority: task.priority, task_remaining_work: task.remaining_work, task_activity_id: task.activity_id, task_blocked: task.blocked, story_id: task.story_id, sprint_id: task.sprint_id }, allFields);
    },

    delete: (id) => {

        return db(table).where(idField, id).del();
    }
};
