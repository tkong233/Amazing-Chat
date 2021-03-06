const app = require("../server");
const request = require('supertest');

// describe('Test root endpoint', () => {
//     test('root endpoint response type and content', async () => {
//         return request(app).get('/message').expect(200).then(response => {
//             expect(JSON.stringify(response.text)).toMatch(/Welcome to our chat app/);
//         });
//     });
// });

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
    // test('Successfully upload profile picture', async ()=>{
    //     const testImage = `${__dirname}/../../client/public/uploads/1.jpg`; 
    //     console.log(testImage);
    //     // const testImage = `/home/travis/build/cis557/project-video-and-messaging-web-app-tong-lingxue-fangyu/client/public/uploads/1.jpg`
    //     const email = 'test2@test2.com';
    //     return request(app).post(`/api/users/upload_profile_image/${email}/`)
    //     // .set('Authorization', `Bearer ${process.env.testUserJWT}`)
    //     .attach('file', testImage)
    //     .expect(200)
    // });

    // test('cannot find user profile when uploading', async ()=>{
    //     const testImage = `/home/travis/build/cis557/project-video-and-messaging-web-app-tong-lingxue-fangyu/client/public/uploads/1.jpg`;
    //     const email = 'tgafkb2@test2.com';
    //     return request(app).post(`/api/users/upload_profile_image/${email}/`)
    //     .attach('file', testImage)
    //     .expect(404)
    // });

    // test('fail to upload profile picture', async()=>{
    //     const testImage = '${__dirname}/../../client/public/uploads/1.jpg';
    //     const email = 'test2@test2.com';
    //     return request(app).post(`/api/users/upload_profile_image/${email}/`)
    //     // .set('Authorization', `Bearer ${process.env.testUserJWT}`)
    //     .attach('name', testImage)
    //     .expect(500)
    // });
    
    test('post status user not exist', async()=>{    
        const email = 'testNonExist@test.com';
        return request(app).post(`/api/users/status/${email}/`)
        .expect(404)
        .then(response => {
            expect(JSON.stringify(response.text)).toMatch("\"{\\\"usernotfound\\\":\\\"Can't find user profile\\\"}\"");
            });
    });

    // test('post status only text', async()=>{
    //     const email = 'test2@test2.com';
    //     return request(app).post(`/api/users/status/${email}/`)
    //     .send('text=busy')
    //     .expect(200)
    //     .then(response => {
    //         expect(JSON.stringify(response.text)).toMatch("\"{\\\"message\\\":\\\"status added successfully\\\"}\"");
    //         });
    // });

    // test('post status picture', async ()=>{
    //     // const testImage = `${__dirname}/../../client/public/uploads/status/4.jpg`;
    //     const testImage = `/home/travis/build/cis557/project-video-and-messaging-web-app-tong-lingxue-fangyu/client/public/uploads/status/4.jpg`
    //     const email = 'test2@test2.com';
    //     return request(app).post(`/api/${email}/`)
    //     .attach('file', testImage)
    //     .expect(200)
    // });
})

