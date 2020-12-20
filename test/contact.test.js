const app = require("../server");
const request = require('supertest');

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
        // request(app).post('/api/users/register')
        // .send('name=testusr2&email=test2@test2.com&password=Test1234567!&password2=Test1234567!&question=Color?&answer=Yellow')
        // .expect(200);

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

    // describe('Test DELETE api/users/profile/:email', ()=>{
    //     test('user deleted', ()=>{
    //         const email = 'initaiteuser@nonexist.com';
    //         return request(app).delete(`/api/users/profile/${email}/`)
    //         .expect(200);
    //     });
    // }); 

    // test('fail to add contact -- target user not found', ()=>{
    //     const email1 = 'test@test.com';
    //     const email2 = 'initaiteuser@nonexist.com';
    //     return request(app).post(`/contact/`)
    //     .send(`email1=${email1}&email2=${email2}`)
    //     .expect(404)
    //     .then(response => {
    //         console.log(response.text);
    //         // expect(JSON.stringify(response.text)).toMatch("\"{\\\"message\\\":\\\"user not found\\\"}\"");
    //         });
    // });

    test('contact already exists', ()=>{
        const email1 = 'test@test.com';
        const email2 = 'test2@test2.com';
        return request(app).post(`/contact/`)
        .send(`email1=${email1}&email2=${email2}`)
        .expect(400)
        // .then(response => {
        //     // console.log(response)
        //     // expect(JSON.stringify(response.text)).toMatch("\"{\\\"message\\\":\\\"user not found\\\"}\"");
        //     });
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
        // .then(response => {
        //     console.log(response.text);
        //     });
    });
});