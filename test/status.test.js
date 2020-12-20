const app = require("../server");
const request = require('supertest');

describe('Test Get /status/:email', ()=>{
    test('successfully get a list of status', ()=>{
        const email = "test2@test2.com";
        return request(app).get(`/status/${email}`)
        .expect(200)
        .then(response => {
            expect(JSON.stringify(response.text)).toMatch("[]");
        });
    });
});

describe('Test Post /status/seen/:email/:id', ()=>{
    test('user not found', ()=>{
        const email = "user123@1234.com";
        const id = '3';
        return request(app).get(`/status/seen/${email}/${id}`)
        .expect(404)
    });
});