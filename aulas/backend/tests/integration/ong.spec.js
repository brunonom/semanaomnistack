const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ong', () => {
	beforeEach(async () => {
		await connection.migrate.rollback();
		await connection.migrate.latest();
	});

	afterAll(async () => {
		await connection.destroy();
	});

	it('should be able to create a new ong', async () => {
		const response = await request(app)
		.post('/ongs')
		.send({
			name: "abaaa",
			email: "ib@test.com",
			whatsapp: "18369493845",
			city: "parnaiba",
			uf: "AA"
		});

		expect(response.body).toHaveProperty('id');
		expect(response.body.id).toHaveLength(8);
	});

});