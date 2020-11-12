
//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');


chai.use(chaiHttp);

describe('/GET', () => {
    it('it should GET root API', (done) => {
          chai.request(server)
          .get('/')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.message.should.include("Welcome to our chat app");
            done();
          });
    });
});