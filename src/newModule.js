import { ProjectModule } from './projectModule'
import { todo } from './TODO_factory'


let todo_array = [];

const saveProject = () => {
    const name = document.querySelector('#project-form [name="name"]').value;
    if (name.length > 0) {
        ProjectModule.addProject(name);
    }
}

const saveTodo = () => { 
    const title = document.querySelector('#todo-form [name="title"]').value;
    const description = document.querySelector('#todo-form [name="description"]').value;
    const dueDate = document.querySelector('#todo-form [name="dueDate"]').value;
    const project = document.querySelector('#todo-form [name="project"]').value;
    const priority = document.querySelector('#todo-form [name="priority"]').value;
    const status = document.querySelector('#todo-form [name="status"]').value;

    todo_array.push(todo(title, description, dueDate, priority, project, status));
    console.log(todo_array)
}

const createProject = () => {
    const projectSubmit = document.querySelector('#project-form');
    projectSubmit.addEventListener('submit', (e) => {
        saveProject()
        console.log(ProjectModule.returnAllProjects())
        e.preventDefault()
    })
}

const createTodo = () => {
    const todoSubmit = document.querySelector('#todo-form');
    todoSubmit.addEventListener('submit', (e) => {
        saveTodo()
        e.preventDefault()
    })
}


export { createProject, createTodo, todo_array }