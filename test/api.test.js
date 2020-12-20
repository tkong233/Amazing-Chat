const app = require("../server");
const request = require('supertest');


describe('Test DELETE api/users/profile/:email', ()=>{
    test('user deleted', ()=>{
        const email = 'test2@test2.com';
        return request(app).delete(`/api/users/profile/${email}/`)
        .expect(200);
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
    test('Account already exists', ()=>{
        return request(app).post('/api/users/register')
        .send('name=testusr2&email=test2@test2.com&password=Test1234567!&password2=Test1234567!&question=Color?&answer=Yellow')
        .expect(400)
        .then(response => {
            expect(JSON.stringify(response.text)).toMatch("\"{\\\"email\\\":\\\"Email already exists\\\"}\"");
            });
    });
});

describe('Test /login endpoint', () =>{
    test('request body not valid', ()=>{
        return request(app).post('/api/users/login')
        .send('email=test@test.com')
        .expect(400)
        .then(response => {
            expect(JSON.stringify(response.text)).toMatch("\"{\\\"password\\\":\\\"Password field is required\\\"}\"");
            });
    });
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
    test('email not registered', ()=>{
        return request(app).post('/api/users/reset')
        .send('email=abcdefg@test.com&password=Test1234567.&password2=Test1234567.&question=Color?&answer=Blue')
        .expect(400);
    });
    test('security question not match', ()=>{
        return request(app).post('/api/users/reset')
        .send('email=test2@test2.com&password=Test1234567!&password2=Test1234567!&question=Animal?&answer=Blue')
        .expect(400);
    });
    test('security question answer not match', ()=>{
        return request(app).post('/api/users/reset')
        .send('email=test2@test2.com&password=Test1234567!&password2=Test1234567!&question=Color?&answer=Black')
        .expect(400);
    });
});

describe('Test upload profile picture',()=>{
    test('post status user not exist', async()=>{    
        const email = 'testNonExist@test.com';
        return request(app).post(`/api/users/status/${email}/`)
        .expect(404)
        .then(response => {
            expect(JSON.stringify(response.text)).toMatch("\"{\\\"usernotfound\\\":\\\"Can't find user profile\\\"}\"");
            });
    });

});

describe('Test GET /contacts/:email', ()=>{
    test('user not exist', async()=>{    
        const email = 'testNonExist@test.com';
        return request(app).get(`/contacts/${email}/`)
        .expect(404)
        .then(response => {
            expect(JSON.stringify(response.text)).toMatch("\"{\\\"message\\\":\\\"user not found\\\"}\"");
            });
    });

    test('successfullt find contacts', ()=>{   
        const email = 'test2@test2.com';
        return request(app).get(`/contacts/${email}/`)
        .expect(200)
        .then(response => {
            expect(JSON.stringify(response.text)).toMatch("[]");
            });
    });
}); 

describe('Test Post /contact', ()=>{
    test('fail to add contact -- initiate user not found', ()=>{
        const email1 = 'initaiteuser@nonexist.com';
        const email2 = 'test@test.com';
        return request(app).post(`/contact/`)
        .send(`email1=${email1}&email2=${email2}`)
        .expect(404)
        .then(response => {
            expect(JSON.stringify(response.text)).toMatch("\"{\\\"message\\\":\\\"user not found\\\"}\"");
            });
    });

    test('contact already exists', ()=>{
        const email1 = 'test@test.com';
        const email2 = 'test2@test2.com';
        return request(app).post(`/contact/`)
        .send(`email1=${email1}&email2=${email2}`)
        .expect(400)
    });

});

describe('Test Delete /contact',()=>{
    test('successfully delete', ()=>{
        const email1 = 'test@test.com';
        const email2 = 'dd@123.com';
        return request(app).delete(`/contact/`)
        .send(`email1=${email1}&email2=${email2}`)
        .expect(200)
        .then(response => {
            // console.log("response.text");
            // expect(JSON.stringify(response.text)).toMatch("\"{\\\"message\\\":\\\"user not found\\\"}\"");
            });
    })
});

describe('Test Get /suggestion', ()=>{
    test('successfully get suggestions', ()=>{
        const email = "test2@test2.com"
        return request(app).get(`/suggestion/${email}`)
        .expect(200)
    });
});

describe('Test Get /status/:email', ()=>{
    test('successfully get a list of status', ()=>{
        const email = "test2@test2.com"
        return request(app).get(`/status/${email}`)
        // .expect(200)
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

