const todo = (
	title,
	description,
	dueDate,
	priority = 'NOT IMPORTANT',
	projectName = 'GENERAL',
	status = 'INCOMPLETE',
) => {
		return ({
			title,
			description,
			dueDate,
			priority,
			projectName,
			status
		});
	};


export { todo };
