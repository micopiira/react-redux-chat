const server = require('../src/server/index').default;
const {describe, it, after, before} = require('mocha');
const chai = require('chai');
const {assert, expect} = chai;
const chaiHttp = require('chai-http');
const http = require('http');
const getRandomPort = require('random-port');

chai.use(chaiHttp);

describe('Routes', () => {
	before(done => {
		getRandomPort(randomPort => {
			server.listen({host: '0.0.0.0', port: randomPort}, done);
		});
	});
	describe('GET /', () => {
		it('should return 200', done => {
			chai.request(server).get('/').end((err, res) => {
				expect(res).to.have.status(200);
				done(err);
			});
		}).timeout(25000);
	});
	describe('GET /404', () => {
		it('should return 404', done => {
			chai.request(server).get('/404').end((err, res) => {
				expect(res).to.have.status(404);
				done();
			});
		});
	});
	after(done => {
		server.close(done);
	});
});