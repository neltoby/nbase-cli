/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
const got = require('got');
const { validate } = require('email-validator');
const passwordValidator = require('password-validator');

const schema = new passwordValidator();

schema
	.is()
	.min(8) // Minimum length 8
	.is()
	.max(25) // Maximum length 25
	.has()
	.uppercase() // Must have uppercase letters
	.has()
	.lowercase() // Must have lowercase letters
	.has()
	.symbols() // Must have a symbol
	.has()
	.digits() // Must have a digits
	.has()
	.not()
	.spaces();

const { DOMAIN } = require('../constants');

const validateUser = async (input) => {
	// const response = await got(`${DOMAIN}/validate-user`);
	const response = { valid: true };
	return response;
};

const validateEmail = async (input) => {
	// const response = await got(`${DOMAIN}/validate-email`);
	const response = { valid: true };
	return response;
};

const validatePassword = (input) => {
	const res = schema.validate(input, { list: true });
	console.log(res);
	let str = '';
	if (Array.isArray(res) && res.length) {
		res.forEach((element) => {
			str +=
				element === 'min'
					? 'Password must be a minimum of 8 characters. '
					: element === 'max'
					? 'Password must not be more than 25 characters. '
					: element === 'uppercase'
					? 'Password must contain an uppercase character. '
					: element === 'lowercase'
					? 'Password must contain a lowercase character. '
					: element === 'symbols'
					? 'Password must contain atleast a special character. '
					: element === 'digits'
					? 'Password must contain atleast a number. '
					: 'Password must not contain spaces. ';
		});
	}
	return str;
};

exports.create = async (prompt, visible = false) => {
	prompt([
		{
			type: 'input',
			name: 'username',
			message: 'Username',
			validate(input) {
				const done = this.async();
				(async (val) => {
					const { valid } = await validateUser(val);
					if (!valid) {
						done('username already exist.');
						return;
					}
					done(null, true);
				})(input);
			},
		},
		{
			type: 'input',
			name: 'email',
			message: 'Email',
			validate(input) {
				const done = this.async();
				if (!validate(input)) done('email is not valid.');
				(async (val) => {
					const { valid } = await validateEmail(val);
					if (!valid) {
						done('email already exist.');
						return;
					}
					done(null, true);
				})(input);
			},
		},
		{
			type: visible ? 'input' : 'password',
			name: 'password',
			message: 'Password:  ',
			validate(input) {
				const done = this.async();
				const res = validatePassword(input);
				if (res) done(res);
				done(null, true);
			},
		},
	])
		.then((answers) => {
			// await
			console.log(answers);
		})
		.catch((e) => console.log('User could not be created.'));
};
