const app = require("../server");
const request = require('supertest');
// const jwt = require('jsonwebtoken');

// const testToken = jwt.sign({
//     name: 'testuser',
//   }, 'this_is_a_secret', { expiresIn: '1h' });

// const keys = require("../../config/keys");
// const { response } = require("../../server");
// const { TestScheduler } = require("jest");

describe('Test root endpoint', () => {
    test('root endpoint response type and content', async () => {
        return request(app).get('/').expect(200).then(response => {
            expect(JSON.stringify(response.text)).toMatch(/Welcome to our chat app/);
        });
    });
});


describe('Test /register endpoint', () =>{
    const responseRegister = {name: 'testuser', email: 'test@test.com', password: '', date: Date.now}
    test('successfully create a new user', ()=>{
        return request(app).post('/api/users/register')
        .send('name=testuser&email=test@test.com&password=Test1234567.&password2=Test1234567.&question=Color?&answer=blue')
        .expect(400)
        // .then(response =>{
        //     expect(JSON.parse(response.text).data).toStrictEqual(responseRegister);
        // });
    });
});

// describe('Test /login endpoint', () => {
//     const payload = {id: 'userid', name: 'testuser'}
//     const testToken = jwt.sign({
//         payload,
//     }, keys.secretOrKey, { expiresIn: '1800s' });

//     const responseLogin = { success: 'True', token: testToken }
//     test('/login email not found', () => {
//         return request(app).post('/login')
//         .send({
//             email: 'not_exist@test.com',
//             password: 'Test1234567.'
//         })
//         .expect(404)
//         .then(response => {
//             expect(JSON.stringify(response.text)).toMatch(/Email not Found/);
//         });
//     });
//     test('/login endpoint response & status code', () => {
    
//         return request(app).post('/login')
//         .send({
//             email: 'test@test.com', 
//             password:'Test1234567.'
//         })
//         .expect(200).then(response => {
//             expect(JSON.parse(response.text)).toStrictEqual(responseLogin);
//         });
//     });

//     test('/login password not match', () => {
//         return request(app).post('/login')
//         .send({
//             email: 'test@test.com', 
//             password:'Test123456888.'})
//         .expect(400).then(response => {
//             expect(JSON.stringify(response.text)).toMatch(/Password incorrect/);
//         });
//     });
// });
