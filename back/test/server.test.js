require("dotenv").config();
const server = require('../src/server');
const validators = require("./helpers/validators")
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_AUTH_SECRET;
const user_id = 151;
const token = jwt.sign({ data: { user_id } }, secretKey, { expiresIn: '1h' });
const user = {
    username: "test_user",
    email: "test_user@example.com",
    phone_number: "+34567890098",
    password: "test_user",
}

describe('Authorization Endpoint Tests', () => {
    describe('POST /api/auth/sign_up', () => {
        it('should return a response with an user DTO with correct structure and value', async () => {
            const res = await chai
                .request(server)
                .post('/api/auth/sign_up')
                .send(user);
        
            chai.expect(res).to.have.status(201);
            validators.validateUserStructure(res.body);
        });
    });
});

describe('Protected Endpoint Tests', () => {
    describe('Project requests tests', () => {
        const project = {
            name: "Some project name",
            description: "Some project description",
        };
        let projectDto;

        describe('GET /api/projects', () => {
            it('should return a response with an array of project DTOs with correct structure', async () => {
                const res = await chai
                    .request(server)
                    .get('/api/projects')
                    .set('Authorization', `Bearer ${token}`);
            
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).that.is.an('array');
                if (res.body.length > 0) {
                    res.body.forEach(project => {
                        validators.validateProjectStructure(project);
                    });
                }
            });
        });
        
        describe('POST /api/projects', () => {
            it('should return a response with an project DTO with correct structure', async () => {
                const res = await chai
                    .request(server)
                    .post('/api/projects')
                    .set('Authorization', `Bearer ${token}`)
                    .send(project);
                
                chai.expect(res).to.have.status(201);
                validators.validateProjectStructure(res.body);
                projectDto = res.body;
            });
        });
        describe('GET /api/projects/:project_id', () => {
            it('should return a response with project DTO with correct structure and values', async () => {
                const res = await chai
                    .request(server)
                    .get(`/api/projects/${projectDto.project_id}`)
                    .set('Authorization', `Bearer ${token}`);
            
                chai.expect(res).to.have.status(200);
                validators.validateProjectStructure(res.body);
                validators.validateProjectValues(user_id, projectDto, res.body)
                
            });
        });
        describe('GET /api/projects/name/name', () => {
            it('should return a response with project DTO with correct structure and values', async () => {
                const res = await chai
                    .request(server)
                    .get(`/api/projects/name/${projectDto.name}`)
                    .set('Authorization', `Bearer ${token}`);
            
                chai.expect(res).to.have.status(200);
                validators.validateProjectStructure(res.body);
                validators.validateProjectValues(user_id, projectDto, res.body)
                
            });
        });
        describe('DELETE /api/projects/:project_id', () => {
            it('should return a response with status 200', async () => {
                const res = await chai
                    .request(server)
                    .delete(`/api/projects/${projectDto.project_id}`,)
                    .set('Authorization', `Bearer ${token}`);
                
                chai.expect(res).to.have.status(200);
            });
        });
    });

    describe('Tasks requests tests', () => {
        const task = {
            name: "Implement Project Management System",
            project_id: 1,
            description: "Implement the selected project management system and train employees on its use.",
            status: "In Progress",
            priority: "high",
            deadline: "2025-01-10T10:00:00.000+00:00",
            assigned_to: 1,
            team_id: 1,
            created_at: "2024-12-28T01:35:30.348+00:00",
            task_id: 80
        };
        let taskDto;

    });
});
