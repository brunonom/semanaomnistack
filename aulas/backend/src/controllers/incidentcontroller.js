const connection = require('../database/connection');

module.exports = {
	async index(require, response) {
		const { page = 1 } = require.query;

		const [count] = await connection('incidents').count();

		const incidents = await connection('incidents')
			.join('ongs', 'ong_id', '=', 'incidents.ong_id')
			.limit(5)
			.offset((page - 1) * 5)
			.select([
				'incidents.*',
				'ongs.name',
				'ongs.email',
				'ongs.whatsapp',
				'ongs.city',
				'ongs.uf'
			]);

		response.header('x-total-count', count['count(*)']);

		return response.json(incidents);
	},

	async create(request, response) {
		const { title, description, value } = request.body;
		const ong_id = request.headers.authorization;

		const [id] = await connection('incidents').insert({
			title,
			description,
			value,
			ong_id
		});

		return response.json({ id });
	},

	async delete(request, response) {
		const { id } = request.params;
		const ong_id = request.headers.authorization;

		const incident = await connection('incidents')
			.where('id', id)
			.select('ong_id')
			.first();

		if (incident.ong_id !== ong_id) {
			return response.status(401).json({ error: "n pode n puta, va deletar sua propria porra la" });
		}

		await connection('incidents').where('id', id).delete();

		return response.status(204).send();
	},
};