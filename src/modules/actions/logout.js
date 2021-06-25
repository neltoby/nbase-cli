/* eslint-disable indent */
/* eslint-disable no-tabs */
const { unlink } = require('fs/promises');
const path = require('path');

exports.logout = async () => {
	try {
		const url = path.join(__dirname, '../..');
		const res = await unlink(`${url}/token.txt`);
		console.log('Logged out.');
	} catch (e) {
		console.log('Could not log you out.');
	}
};

exports.logoutFromServer = async () => {};
