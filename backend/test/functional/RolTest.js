"use strict"

let chai = require('chai'),
    chaiHttp = require('chai-http'),
    expect = require('chai').expect,
    Promise = require('promise');

chai.use(chaiHttp);

const config = require('../../config/config.js');
const server= 'http://localhost:' + config.SERVER_PORT;

let loginUser = {
    'email': config.USER_MAIL_TEST_ADMIN,
    'password': config.USER_PASSWORD_TEST_ADMIN
};

function login(){
    let promise = new Promise(function(resolve, reject){
        chai.request(server)
        .post('/auth/login')
        .send(loginUser)
        .end((err, res) => {
            expect(res).to.have.status(200);
            let token = res.body.token;
            resolve(token);
        });
    });
    return promise;
}

describe('ROL: ',()=>{
    it('read roles', (done) => {
        login().then(function(token){
            chai.request(server)
            .get('/api/roles')
            .set('authorization', "Bearer " + token)
            .end( function(err,res){
                expect(res).to.have.status(200);
                done();
            });
        });
    });
});
