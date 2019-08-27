const todo = (
    title,
    description,
    dueDate,
    priority = "NOT IMPORTANT",
    projectName = "GENERAL",
    status = "INCOMPLETE"
) => {
    /*const getTitle = () => title;
      const getDescription = () => description;
      const getdueDate = () => dueDate;
      const getPriority = () => priority;
      const getProjectName = () => projectName;
      const getStatus = () => status;*/

    return { title, description, dueDate, priority, projectName, status };
};

export { todo };