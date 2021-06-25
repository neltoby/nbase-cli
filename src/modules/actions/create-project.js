exports.createProject = (prompt) => {
	prompt([
		{
			type: 'confirm',
			name: 'existingProject',
			message: 'Would you like to use an existing project?',
		},
	])
		.then(({ existingProject }) => {
			if (!existingProject) {
				prompt([
					{
						type: 'input',
						name: 'projectName',
						message: 'Name of your project: ',
					},
					{
						type: 'checkbox',
						name: 'service',
						message: 'Choose the services of your choice for this project: ',
						choices: ['Authentication', 'Authorization'],
					},
				])
					.then((answer) => {
						console.log(answer);
					})
					.catch((err) => console.log(err));
			}
		})
		.catch((err) => console.log(err));
};
