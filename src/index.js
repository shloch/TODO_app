'use strict';

import { todo } from "./TODO_factory";
import { ProjectModule } from "./projectModule";
import { domModule } from "./domModule";

let todo_array = [];
let dom = domModule;

const saveProject = () => {
    console.log('save project');
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
}

const createProject = () => {
    const projectSubmit = document.querySelector('#project-form');
    projectSubmit.addEventListener('click', (e) => {
        alert('creating...')
        saveProject();
        e.preventDefault();
    })
}

const createTodo = () => {
    const todoSubmit = document.querySelector('#todo-form');
    todoSubmit.addEventListener('submit', (e) => {
        console.log('sumitted');
        saveTodo()
        e.preventDefault()
    })
}

dom.createProjectForm();
dom.createTodoForm();
createProject();
//createTodo();

console.log(todo_array)
console.log(ProjectModule.returnAllProjects())