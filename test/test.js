const server = require('../src/server/index').default;
const {describe, it, after} = require('mocha');
const chai = require('chai');
const {assert, expect} = chai;
const chaiHttp = require('chai-http');
const http = require('http');

chai.use(chaiHttp);

describe('Routes', () => {
	describe('GET /', () => {
		it('should return 200', done => {
			chai.request(server).get('/').end((err, res) => {
				expect(res).to.have.status(200);
				done(err);
			});
		}).timeout(15000);
	});
	describe('GET /404', () => {
		it('should return 404', done => {
			chai.request(server).get('/404').end((err, res) => {
				expect(res).to.have.status(404);
				done();
			});
		});
	});
	after(() => {
		server.close();
	});
});