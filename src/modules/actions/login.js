/* eslint-disable indent */
/* eslint-disable no-tabs */
const path = require('path');
const { open } = require('fs/promises');
const { validate } = require('email-validator');

const loginUser = async (obj) => {
	try {
		const url = path.join(__dirname, '../..');
		const filehandle = await open(`${url}/token.txt`, 'w');
		filehandle.writeFile(JSON.stringify(obj), 'utf8');
		await filehandle.close();
		console.log('Logged in.');
	} catch (err) {
		console.log('Already logged in.');
	}
};

exports.login = (prompt, visible = false) => {
	prompt([
		{
			type: 'input',
			name: 'email',
			message: 'Email:  ',
			validate(input) {
				const done = this.async();
				if (!validate(input)) {
					done('Email is not valid');
					return;
				}
				done(null, true);
			},
		},
		{
			type: visible ? 'input' : 'password',
			name: 'password',
			message: 'Password:  ',
		},
	])
		.then((answers) => {
			loginUser(answers);
		})
		.catch((err) => console.log('Login went wrong. Retry again.'));
};
