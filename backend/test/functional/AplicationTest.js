/// https://www.paradigmadigital.com/dev/testeo-api-rest-mocha-chai-http/
const config = require('../../config/config.js');
let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
chai.use(chaiHttp);
const server= 'http://localhost:' + config.SERVER_PORT;

let loginUser = {
	'email': config.USER_MAIL_TEST,
	'password': config.USER_PASSWORD_TEST
};

describe('Insert a aplication: ',()=>{
	it('should insert a aplication', (done) => {
		chai.request(server)
			.post('/auth/login')
            .send(login_details)
            .end((err, res) => {
				console.log('this was run the login part');
				//res.should.have.status(200);
				expect(res).to.have.status(200);

				//expect(res.body.state).to.be.true;
				//expect(res).have.property('token');

				let token = res.body.token;

				chai.request(server)
				.post('/api/aplications')
				.set('authorization', token)
				.send(
					{
						project: 'Id',
						description: "Descripcion aplicacion"
					}
				)
				.end( function(err,res){
					console.log(res.body)
					expect(res).to.have.status(200);
					done();
				});
			});


	});
});

/*
describe('Insert a aplication with error: ',()=>{
	it('should receive an error', (done) => {
		chai.request(url)
			.post('/aplications')
			.send({des: "Descripcion"})
			.end( function(err,res){
				console.log(res.body)
				expect(res).to.have.status(500);
				done();
			});
	});

});

describe('get all aplications: ',()=>{

	it('should get all aplications', (done) => {
		chai.request(url)
			.get('/aplications')
			.end( function(err,res){
				console.log(res.body)
				expect(res).to.have.status(200);
				done();
			});
	});

});

describe('get the country with id 1: ',()=>{

	it('should get the country with id 1', (done) => {
		chai.request(url)
			.get('/country/1')
			.end( function(err,res){
				console.log(res.body)
				expect(res.body).to.have.property('id').to.be.equal(1);
				expect(res).to.have.status(200);
				done();
			});
	});

});

describe('update the days of country with id 1: ',()=>{

	it('should update the number of days', (done) => {
		chai.request(url)
			.put('/country/1/days/20')
			.end( function(err,res){
				console.log(res.body)
				expect(res.body).to.have.property('days').to.be.equal(20);
				expect(res).to.have.status(200);
				done();
			});
	});

});


describe('delete the country with id 1: ',()=>{

	it('should delete the country with id 1', (done) => {
		chai.request(url)
			.get('/countries')
			.end( function(err,res){
				console.log(res.body)
				expect(res.body).to.have.lengthOf(2);
				expect(res).to.have.status(200);
				chai.request(url)
					.del('/country/1')
					.end( function(err,res){
						console.log(res.body)
						expect(res).to.have.status(200);
						chai.request(url)
							.get('/countries')
							.end( function(err,res){
								console.log(res.body)
								expect(res.body).to.have.lengthOf(1);
								expect(res.body[0]).to.have.property('id').to.be.equal(0);
								expect(res).to.have.status(200);
								done();
						});
					});
			});
	});

});
*/
