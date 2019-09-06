const todo = (title, description, dueDate, priority = 'NOT IMPORTANT', projectName = 'GENERAL', status = 'INCOMPLETE') => ({
  title,
  description,
  dueDate,
  priority,
  projectName,
  status,
});


// eslint-disable-next-line import/prefer-default-export
export { todo };
