const generateUniqueID = require('../../src/utils/generateUniqueID');


describe('genetrate unique id', () => {
	it('should generate an unique id', () => {
		const id = generateUniqueID();

		expect(id).toHaveLength(8);
	})
});