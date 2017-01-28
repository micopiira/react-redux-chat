const {close, server} = require('../src/index');
const {describe, it, after} = require('mocha');
const chai = require('chai');
const {assert, expect} = chai;
const chaiHttp = require('chai-http');
const http = require('http');
chai.use(chaiHttp);

describe('Test', () => {
	it('should return 200', done => {
		chai.request(server).get('/').then(res => {
			expect(res).to.have.status(200);
			done();
		})
		.catch(err => {
			throw err;
		});
	}).timeout(15000);
	after(() => {
		close();
	});
});