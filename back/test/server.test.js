require("dotenv").config();
const server = require('../src/server');
const validators = require("./helpers/validators")
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_AUTH_SECRET;

const token = jwt.sign({ data: { user_id: 151 } }, secretKey, { expiresIn: '1h' });

describe('Protected Endpoint Tests', () => {
    describe('GET /api/tasks', () => {
        it('should return a response with an array of tasks with correct structure', async () => {
            const res = await chai
                .request(server)
                .get('/api/tasks')
                .set('Authorization', `Bearer ${token}`);
        
            chai.expect(res).to.have.status(200);
            chai.expect(res.body).that.is.an('array');
            if (res.body.length > 0) {
                res.body.forEach(task => {
                    validators.validateTaskStructure(task);
                });
            }
        });
    });
    describe('GET /api/projects', () => {
        it('should return a response with an array of projects with correct structure', async () => {
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
});
