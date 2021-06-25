#!/usr/bin/env node
/* eslint-disable indent */
/* eslint-disable no-tabs */
const { prompt } = require('inquirer');
const { program } = require('commander');
const { open } = require('fs/promises');

const packageJ = require('../package.json');
const { create } = require('./modules/actions/create');
const { login } = require('./modules/actions/login');
const { logout } = require('./modules/actions/logout');
const { whoami } = require('./modules/actions/whoami');
const { createProject } = require('./modules/actions/create-project');

program.version(packageJ.version);

program.option('-c, --create', 'create an account');

program
	.command('login')
	.description(
		'Login a user. Pass the -v or --visible option to make password visible.'
	)
	.option('-v, --visible', 'make password visible')
	.action(async (options) => {
		try {
			const filehandle = await open(`${__dirname}/token.txt`, 'r+');
			const content = await filehandle.readFile('utf8');
			console.log(JSON.parse(content).email);
		} catch (err) {
			if (options.visible) {
				login(prompt, true);
			} else {
				login(prompt);
			}
		}
	});
program
	.command('create')
	.description(
		'Create a new user. Pass the -v or --visible option to make password visible.'
	)
	.option('-v, --visible', 'make password visible')
	.action(async (options) => {
		try {
			await open(`${__dirname}/token.txt`, 'r');
			console.log('You need to logout previous user.');
		} catch (err) {
			if (options.visible) {
				create(prompt, true);
			} else {
				create(prompt);
			}
		}
	});
program
	.command('logout')
	.description('Logout a user')
	.action(() => {
		logout();
	});
program
	.command('create-project')
	.description('Create a project')
	.action(async () => {
		const { email = undefined } = await whoami();
		if (email) {
			console.log(`Mangaing project for ${email}`);
			setTimeout(() => {
				createProject(prompt);
			}, 1000);
		} else {
			console.log('Not logged in.');
		}
	});
program
	.command('delete')
	.description('Delete a project.')
	.action(() => {
		console.log('Deleting a project ');
	});
program
	.command('list')
	.description('List all user project')
	.action(() => {
		console.log('Creating project ');
	});
program
	.command('whoami')
	.description('Displays logged in user')
	.action(async () => {
		const { email = undefined } = await whoami();
		if (email) console.log(email);
		else console.log('Not logged in.');
	});
program
	.command('project')
	.description('Displays current project.')
	.action(async () => {
		const { email = undefined } = await whoami();
		if (email) console.log('current project');
		else console.log('Not logged in.');
	});

program.parse(process.argv);

const options = program.opts();
if (options.create) console.log('Creating...', process.argv);
