const commands = ['create', 'delete'];

exports.parser = (arr) => {
	const newArr = arr.slice(2);
	if (newArr.length > 1 && !commands.includes(newArr[0])) {
		console.log(
			`Unknown command.
      
      To see the list of all available options, run nbase --help or nbase -h.
      `
		);
		return null;
	}
	return arr;
};
