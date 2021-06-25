const { open } = require('fs/promises');
const path = require('path');

exports.whoami = async () => {
	try {
		const url = path.join(__dirname, '../..');
		const filehandle = await open(`${url}/token.txt`, 'r');
		const content = await filehandle.readFile('utf8');
		return JSON.parse(content);
	} catch (e) {
		return {};
	}
};
