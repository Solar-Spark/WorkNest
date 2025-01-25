require("dotenv").config();
const { connectDB } = require('../src/config/mongo_db');
const server = require('../src/server');
const validators = require("./helpers/validators")
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_AUTH_SECRET;
const users = [
    {
        username: "test_user",
        email: "test_user@example.com",
        phone_number: "+34567890091",
        password: "test_user123",
        user_id: null,
        token: null,
    },
    {
        username: "test_user2",
        email: "test_user2@example.com",
        phone_number: "+34567890092",
        password: "test_user1234",
        user_id: null,
        token: null,
    }
];

describe('API Tests', function () {
    this.timeout(10000);
    before(async function () {
        console.log('Connecting to MongoDB...');
        await connectDB();
    });

    describe('Authorization Endpoint Tests', () => {
        describe('POST /api/auth/sign_up', async () => {
            it('should return a response with an user DTO with correct structure and value', async () => {
                for(const user of users){
                    const res = await chai
                    .request(server)
                    .post('/api/auth/sign_up')
                    .send(user);
            
                    chai.expect(res).to.have.status(201);
                    validators.validateUserStructure(res.body);
                    user.user_id = res.body.user_id;
                    user.token = jwt.sign({ data: { user_id: user.user_id } }, secretKey, { expiresIn: '1h' })
                }
            });
        });
    });

    describe('Protected Endpoint Tests', async () => {
        const project = {
            name: "Some project name",
            description: "Some project description",
        };
        var projectDto;

        const team = {
            name: "Team",
            project_id: null,
            members: [],
            lead: null,
        }
        var teamDto;

        const task = {
            name: "Implement Project Management System",
            project_id: null,
            description: "Implement the selected project management system and train employees on its use.",
            status: "In Progress",
            priority: "High",
            deadline: "2025-01-10T10:00:00.000+00:00",
            assigned_to: null,
            team_id: null,
        };
        var taskDto;

        describe('Creating requests tests', async () => {
            describe('POST /api/projects', async () => {
                it('should return a response with an project DTO with correct structure', async () => {
                    const res = await chai
                        .request(server)
                        .post('/api/projects')
                        .set('Authorization', `Bearer ${users[0].token}`)
                        .send(project);
                    
                    chai.expect(res).to.have.status(201);
                    validators.validateProjectStructure(res.body);
                    projectDto = res.body;
                });
            });

            describe('POST /api/teams', async () => {
                it('should return a response with an team DTO with correct structure', async () => {
                    team.project_id = projectDto.project_id;
                    team.lead = users[0].user_id;
                    console.log(team.lead)
                    users.forEach((item) => {
                        team.members.push(item.user_id);
                    });
                    const res = await chai
                        .request(server)
                        .post('/api/teams')
                        .set('Authorization', `Bearer ${users[0].token}`)
                        .send(team);
                    
                    chai.expect(res).to.have.status(201);
                    validators.validateTeamStructure(res.body);
                    teamDto = res.body;
                });
            });

            describe('POST /api/tasks', async () => {
                it('should return a response with an task DTO with correct structure', async () => {
                    task.project_id = projectDto.project_id;
                    task.team_id = teamDto.team_id;
                    task.assigned_to = users[0].user_id;
                    const res = await chai
                        .request(server)
                        .post('/api/tasks')
                        .set('Authorization', `Bearer ${users[0].token}`)
                        .send(task);
                    
                    chai.expect(res).to.have.status(201);
                    validators.validateTaskStructure(res.body);
                    taskDto = res.body;
                });
            });
        });
        describe('Getting requests tests', async () => {            
            describe('GET /api/projects', async () => {
                it('should return a response with an project DTOs with correct structure', async () => {
                    const res = await chai
                        .request(server)
                        .get('/api/projects')
                        .set('Authorization', `Bearer ${users[0].token}`)
                        
                    chai.expect(res).to.have.status(200);

                    res.body.forEach((item) => {
                        validators.validateProjectStructure(item);
                    });
                });
            });
            describe('GET /api/projects/:project_id', async () => {
                it('should return a response with an project DTOs with correct structure', async () => {
                    const res = await chai
                        .request(server)
                        .get(`/api/projects/${projectDto.project_id}`)
                        .set('Authorization', `Bearer ${users[0].token}`)
                        
                    chai.expect(res).to.have.status(200);

                    validators.validateProjectStructure(res.body);
                });
            });
            describe('GET /api/projects/name/:name', async () => {
                it('should return a response with an project DTOs with correct structure', async () => {
                    const res = await chai
                        .request(server)
                        .get(`/api/projects/name/${project.name}`)
                        .set('Authorization', `Bearer ${users[0].token}`)
                        
                    chai.expect(res).to.have.status(200);

                    validators.validateProjectStructure(res.body);
                });
            });
            describe('GET /api/teams', async () => {
                it('should return a response with an team DTOs with correct structure', async () => {
                    const res = await chai
                        .request(server)
                        .get('/api/teams')
                        .set('Authorization', `Bearer ${users[0].token}`)
                    
                    chai.expect(res).to.have.status(200);

                    res.body.forEach((item) => {
                        validators.validateTeamStructure(item);
                    });
                });
            });
            describe('GET /api/teams/:team_id', async () => {
                it('should return a response with an team DTO with correct structure', async () => {
                    const res = await chai
                        .request(server)
                        .get(`/api/teams/${teamDto.team_id}`)
                        .set('Authorization', `Bearer ${users[0].token}`)
                    
                    chai.expect(res).to.have.status(200);



                    validators.validateTeamStructure(res.body);
                });
            });
            describe('GET /api/teams/project/:project_id', async () => {
                it('should return a response with an team DTOs with correct structure', async () => {
                    const res = await chai
                        .request(server)
                        .get(`/api/teams/project/${projectDto.project_id}`)
                        .set('Authorization', `Bearer ${users[0].token}`)
                    
                    chai.expect(res).to.have.status(200);

                    res.body.forEach((item) => {
                        validators.validateTeamStructure(item);
                    });
                });
            });


            describe('GET /api/tasks', async () => {
                it('should return a response with a task DTOs with correct structure', async () => {
                    const res = await chai
                        .request(server)
                        .get('/api/tasks')
                        .set('Authorization', `Bearer ${users[0].token}`)
                    
                    chai.expect(res).to.have.status(200);

                    res.body.forEach((item) => {
                        validators.validateTaskStructure(item);
                    });
                });
            });

            describe('GET /api/tasks/:task_id', async () => {
                it('should return a response with a task DTO with correct structure', async () => {
                    const res = await chai
                        .request(server)
                        .get(`/api/tasks/${taskDto.task_id}`)
                        .set('Authorization', `Bearer ${users[0].token}`)
                    
                    chai.expect(res).to.have.status(200);

                    validators.validateTaskStructure(res.body);
                });
            });

            describe('GET /api/tasks/project/:project_id', async () => {
                it('should return a response with an task DTOs with correct structure', async () => {
                    const res = await chai
                        .request(server)
                        .get(`/api/tasks/project/${projectDto.project_id}`)
                        .set('Authorization', `Bearer ${users[0].token}`)
                    
                    chai.expect(res).to.have.status(200);

                    res.body.forEach((item) => {
                        validators.validateTaskStructure(item);
                    });
                });
            });

            describe('GET /api/tasks/team/:team_id', async () => {
                it('should return a response with an task DTOs with correct structure', async () => {
                    const res = await chai
                        .request(server)
                        .get(`/api/tasks/team/${teamDto.team_id}`)
                        .set('Authorization', `Bearer ${users[0].token}`)
                    
                    chai.expect(res).to.have.status(200);

                    res.body.forEach((item) => {
                        validators.validateTaskStructure(item);
                    });
                });
            });
            describe('GET /api/users/:user_id', async () => {
                it('should return a response with a user DTO with correct structure', async () => {
                    const res = await chai
                        .request(server)
                        .get(`/api/users/${users[0].user_id}`)
                        .set('Authorization', `Bearer ${users[0].token}`)
                    
                    chai.expect(res).to.have.status(200);

                    validators.validateUserStructure(res.body);
                });
            });
            describe('GET /api/users/team/:team_id', async () => {
                it('should return a response with an user DTOs with correct structure', async () => {
                    const res = await chai
                        .request(server)
                        .get(`/api/users/team/${teamDto.team_id}`)
                        .set('Authorization', `Bearer ${users[0].token}`)
                    
                    chai.expect(res).to.have.status(200);

                    res.body.forEach((item) => {
                        validators.validateUserStructure(item);
                    });
                });
            });
            describe('GET /api/users/username/:username', async () => {
                it('should return a response with an user DTO with correct structure', async () => {
                    const res = await chai
                        .request(server)
                        .get(`/api/users/username/${users[0].username}`)
                        .set('Authorization', `Bearer ${users[0].token}`)
                    
                    chai.expect(res).to.have.status(200);

                    validators.validateUserStructure(res.body);
                });
            });
            describe('POST /api/users/ids', async () => {
                it('should return a response with an user DTOs with correct structure', async () => {
                    const user_ids = [];
                    users.forEach((item) => {
                        user_ids.push(item.user_id);
                    })
                    const res = await chai
                        .request(server)
                        .post(`/api/users/ids`)
                        .set('Authorization', `Bearer ${users[0].token}`)
                        .send({ids: user_ids})
                    
                    chai.expect(res).to.have.status(200);
                    res.body.forEach((item) => {
                        validators.validateUserStructure(item);
                    });
                });
            });
            describe('POST /api/users/search', async () => {
                it('should return a response with an user DTOs with correct structure', async () => {
                    const res = await chai
                        .request(server)
                        .post(`/api/users/search`)
                        .set('Authorization', `Bearer ${users[0].token}`)
                        .send({prompt: users[0].username})
                    
                    chai.expect(res).to.have.status(200);
                    res.body.forEach((item) => {
                        validators.validateUserStructure(item);
                    });
                });
            });
        });
        describe('Updating requests tests', async () => {
            describe('PUT /api/teams/:team_id', async () => {
                it('should return a response with an team DTO with correct structure', async () => {
                    team.name = "New Team Name";
                    const res = await chai
                        .request(server)
                        .put(`/api/teams/${teamDto.team_id}`)
                        .set('Authorization', `Bearer ${users[0].token}`)
                        .send(team)
                    
                    chai.expect(res).to.have.status(200);
                    validators.validateTeamStructure(res.body);
                });
            });
            describe('PUT /api/tasks/:task_id', async () => {
                it('should return a response with an task DTO with correct structure', async () => {
                    task.name = "New Task Name";
                    const res = await chai
                        .request(server)
                        .put(`/api/tasks/${taskDto.task_id}`)
                        .set('Authorization', `Bearer ${users[0].token}`)
                        .send(task)
                    
                    chai.expect(res).to.have.status(200);
                    validators.validateTaskStructure(res.body);
                });
            });
        });
        describe('Deleting requests tests', async () => {
            describe('DELETE /api/tasks/:task_id', async () => {
                it('should return a response with status 200', async () => {
                    const res = await chai
                        .request(server)
                        .delete(`/api/tasks/${taskDto.task_id}`)
                        .set('Authorization', `Bearer ${users[0].token}`)
                    
                    chai.expect(res).to.have.status(200);
                });
            });
            describe('DELETE /api/teams/:team_id', async () => {
                it('should return a response with status 200', async () => {
                    const res = await chai
                        .request(server)
                        .delete(`/api/teams/${teamDto.team_id}`)
                        .set('Authorization', `Bearer ${users[0].token}`)
                    
                    chai.expect(res).to.have.status(200);
                });
            });
            describe('DELETE /api/projects/:project_id', async () => {
                it('should return a response with status 200', async () => {
                    const res = await chai
                        .request(server)
                        .delete(`/api/projects/${projectDto.project_id}`)
                        .set('Authorization', `Bearer ${users[0].token}`)
                    
                    chai.expect(res).to.have.status(200);
                });
            });

            describe('DELETE /api/users', async () => {
                it('should return a response with status 200', async () => {
                    for(const user of users){
                        const res = await chai
                        .request(server)
                        .delete('/api/users')
                        .set('Authorization', `Bearer ${user.token}`);
                    
                        chai.expect(res).to.have.status(200);
                    }
                });
            });
        });
    });
});