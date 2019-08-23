const todo = (title, description, dueDate, priority = "NOT IMPORTANT", projectName = 'GENERAL', status = 'INCOMPLETE') => {

    const getTitle = () => title;
    const getDescription = () => description;
    const getdueDate = () => dueDate;
    const getPriority = () => priority;
    const getProjectName = () => projectName;
    const getStatus = () => status;

    const changeStatus = () => {
        status = (getStatus() == 'INCOMPLETE') ? 'COMPLETE' : 'INCOMPLETE';
    };

    const changeProject = (newName) => {
        projectName = newName;
    };

    const changePriority = () => {
        priority = (getPriority() == 'NOT IMPORTANT') ? 'IMPORTANT' : 'NOT IMPORTANT';
    };


    const changeTodo = (newTitle, newDesc, newDueD) => {
        title = newTitle || getTitle();
        description = newDesc || getDescription();
        dueDate = newDueD || getdueDate();
    };

    return { changeStatus, getTitle, getDescription, getdueDate, getPriority, getProjectName, getStatus, changeTodo };
};

export { todo }