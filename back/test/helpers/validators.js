const chai = require('chai');

function validateTaskStructure(task) {
    chai.expect(task).to.be.an('object');
    chai.expect(task).to.have.property('task_id').that.is.a('number').greaterThan(0);
    chai.expect(task).to.have.property('name').that.is.a('string').with.length.greaterThan(0);
    chai.expect(task).to.have.property('description').that.is.a('string').with.length.greaterThan(0);
    chai.expect(task).to.have.property('status').that.is.a('string').with.length.greaterThan(0);
    chai.expect(task).to.have.property('priority').that.is.a('string').with.length.greaterThan(0);
    chai.expect(task).to.have.property('deadline').that.is.a('string').with.length.greaterThan(0);
    chai.expect(task).to.have.property('assigned_to').that.is.a('number').greaterThan(0);
    chai.expect(task).to.have.property('project_id').that.is.a('number').greaterThan(0);
    chai.expect(task).to.have.property('team_id').that.is.a('number').greaterThan(0);
    chai.expect(task).to.have.property('created_at').that.is.a('string').with.length.greaterThan(0);
}

function validateProjectStructure(project) {
    chai.expect(project).to.be.an('object');
    chai.expect(project).to.have.property('project_id').that.is.a('number').greaterThan(0);
    chai.expect(project).to.have.property('name').that.is.a('string').with.length.greaterThan(0);
    chai.expect(project).to.have.property('description').that.is.a('string').with.length.greaterThan(0);

    chai.expect(project.manager).to.be.an('object');
    chai.expect(project.manager).to.have.property('user_id').that.is.a('number').greaterThan(0);
    chai.expect(project.manager).to.have.property('username').that.is.a('string').with.length.greaterThan(0);
    chai.expect(project.manager).to.have.property('email').that.is.a('string').with.length.greaterThan(0);
    chai.expect(project.manager).to.have.property('phone_number').that.is.a('string').with.length.greaterThan(0);

    chai.expect(project.manager.roles).to.be.an('array').with.length.greaterThan(0);
    project.manager.roles.forEach(role => {
        validateRoleStructure(role);
    });

    chai.expect(project).to.have.property('created_at').that.is.a('string').with.length.greaterThan(0);
}

function validateRoleStructure(role) {
    chai.expect(role).to.have.property('name').that.is.a('string').with.length.greaterThan(0);
    if (role.name === "TEAM_LEAD") {
        chai.expect(role).to.have.property('team_id').that.is.a('number').greaterThan(0);
    } else if (role.name === "PROJECT_MANAGER") {
        chai.expect(role).to.have.property('project_id').that.is.a('number').greaterThan(0);
    }
}

module.exports = {
    validateTaskStructure,
    validateProjectStructure,
    validateRoleStructure,
};