const chai = require('chai');

function validateUserStructure(user) {
    chai.expect(user).to.be.an('object');
    chai.expect(user).to.have.property('user_id').that.is.a('number').greaterThan(0);
    chai.expect(user).to.have.property('username').that.is.a('string').with.length.greaterThan(0);
    chai.expect(user).to.have.property('email').that.is.a('string').with.length.greaterThan(0);
    chai.expect(user).to.have.property('phone_number').that.is.a('string').with.length.greaterThan(0);

    chai.expect(user.roles).to.be.an('array').with.length.greaterThan(0);
    user.roles.forEach(role => {
        validateRoleStructure(role);
    });

    chai.expect(user.roles[0]).to.have.property('name').that.is.a('string').that.equals("USER");
}

function validateUserValues(userDto, user) {
    chai.expect(user).to.be.an('object');
    chai.expect(user).to.have.property('user_id').that.is.a('number').that.equals(userDto.user_id);
    chai.expect(user).to.have.property('username').that.is.a('string').that.equals(userDto.username);
    chai.expect(user).to.have.property('email').that.is.a('string').that.equals(userDto.email);
    chai.expect(user).to.have.property('phone_number').that.is.a('string').that.equals(userDto.phone_number);
    chai.expect(user).to.have.property('roles').that.is.a('array').that.equals(userDto.roles);
}

function validateRoleStructure(role) {
    chai.expect(role).to.have.property('name').that.is.a('string').with.length.greaterThan(0);
    if (role.name === "TEAM_LEAD") {
        chai.expect(role).to.have.property('team_id').that.is.a('number').greaterThan(0);
    } else if (role.name === "PROJECT_MANAGER") {
        chai.expect(role).to.have.property('project_id').that.is.a('number').greaterThan(0);
    }
}

function validateProjectStructure(project) {
    chai.expect(project).to.be.an('object');
    chai.expect(project).to.have.property('project_id').that.is.a('number').greaterThan(0);
    chai.expect(project).to.have.property('name').that.is.a('string').with.length.greaterThan(0);
    chai.expect(project).to.have.property('description').that.is.a('string').with.length.greaterThan(0);

    validateUserStructure(project.manager)

    chai.expect(project).to.have.property('created_at').that.is.a('string').with.length.greaterThan(0);
}

function validateProjectValues(user_id, projectDto, project) {
    chai.expect(project).to.be.an('object');
    chai.expect(project).to.have.property('project_id').that.is.a('number').that.equals(projectDto.project_id);
    chai.expect(project).to.have.property('name').that.is.a('string').that.equals(projectDto.name);
    chai.expect(project).to.have.property('description').that.is.a('string').that.equals(projectDto.description);

    chai.expect(project.manager).to.be.an('object');
    chai.expect(project.manager).to.have.property('user_id').that.is.a('number').that.equals(user_id);

    chai.expect(project).to.have.property('created_at').that.is.a('string').that.equals(projectDto.created_at);
}

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

module.exports = {
    validateUserStructure,
    validateUserValues,
    validateRoleStructure,
    validateProjectStructure,
    validateProjectValues,
    validateTaskStructure,
};