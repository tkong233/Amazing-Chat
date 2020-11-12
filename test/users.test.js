const app = require("../server");
const request = require('supertest');

describe('Test root endpoint', () => {
    test('root endpoint response type and content', async () => {
        return request(app).get('/').expect(200).then(response => {
            expect(JSON.stringify(response.text)).toMatch(/Welcome to our chat app/);
        });
    });
});

describe('Test /register endpoint', () =>{
    test('Fail to register missing request body', ()=>{
        return request(app).post('/api/users/register')
        .send('name=testuser&email=test@test.com&password=Test1234567.&password2=Test1234567.&question=Color?')
        .expect(400)
        .then(response => {
            expect(JSON.stringify(response.text)).toMatch("\"{\\\"answer\\\":\\\"Answer to security question is required\\\"}\"");
            });
    });
    test('Successfully register', ()=>{
        return request(app).post('/api/users/register')
        .send('name=testusr2&email=test2@test2.com&password=Test1234567!&password2=Test1234567!&question=Color?&answer=Yellow')
        .expect(200);
    });
    test('Account already exists 2', ()=>{
        return request(app).post('/api/users/register')
        .send('name=testusr2&email=test2@test2.com&password=Test1234567!&password2=Test1234567!&question=Color?&answer=Yellow')
        .expect(400)
        .then(response => {
            expect(JSON.stringify(response.text)).toMatch("\"{\\\"email\\\":\\\"Email already exists\\\"}\"");
            });
    });
});

describe('Test /login endpoint', () =>{
    test('Email not exist', ()=>{
        return request(app).post('/api/users/login')
        .send('email=abcdefg@test.com&password=Test1234567.')
        .expect(404)
        .then(response => {
        expect(JSON.stringify(response.text)).toMatch("\"{\\\"emailnotfound\\\":\\\"Email not found\\\"}\"");
        });
    });
});

describe('Test /reset endpoint', () =>{
    test('missing input', ()=>{
        return request(app).post('/api/users/reset')
        .send('email=abcdefg@test.com&password=Test1234567.')
        .expect(400);
    });
});

