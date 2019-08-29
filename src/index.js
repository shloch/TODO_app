"use strict";

import { todo } from "./TODO_factory";
import { ProjectModule } from "./projectModule";
import { domModule, current_project } from "./domModule";
import { todoForm, projectForm } from "./forms";
import { TodoModule } from "./todoModule";

let dom = domModule;
let form_holder = document.querySelector("#form-holder");
let projects = ProjectModule.returnAllProjects();
//let current_project = 0;

//project
let createProjectForm = function() {
    let projectButton = document.querySelector("#project-button");
    projectButton.addEventListener("click", () => {
        form_holder.innerHTML = projectForm;
        createProject();
    });
};

const createProject = () => {
    const projectSubmit = document.querySelector("#project-form");
    projectSubmit.addEventListener("submit", e => {
        const name = document.querySelector('#project-form [name="name"]').value;
        if (name.length > 0) {
            if (!projects.includes(name)) {
                ProjectModule.addProject(name);
                domModule.flashMessage("Project created successfully !!");
            } else {
                alert("Project Already exists !!");
            }
        }
        domModule.displayProjectList();
        domModule.displayTodoList();
        e.preventDefault();
    });
};

//todo
const createTodoForm = function() {
    let todoButton = document.querySelector("#todo-button");
    todoButton.addEventListener("click", () => {
        form_holder.innerHTML = todoForm;
        let todoProject = document.querySelector("#todo-form input:nth-child(1)");
        todoProject.value = projects[current_project];
        createTodo();
    });
};

const createTodo = () => {
    const todoSubmit = document.querySelector("#todo-form");
    todoSubmit.addEventListener("submit", e => {
        const title = document.querySelector('#todo-form [name="title"]').value;
        const description = document.querySelector(
            '#todo-form [name="description"]'
        ).value;
        const dueDate = document.querySelector('#todo-form [name="dueDate"]').value;
        const project = document.querySelector('#todo-form [name="project"]').value;
        const priority = document.querySelector('#todo-form [name="priority"]')
            .value;
        const status = document.querySelector('#todo-form [name="status"]').value;

        if (title.length > 2 && description.length > 2 && dueDate.length > 2) {
            let todoObj = todo(
                title,
                description,
                dueDate,
                priority,
                project,
                status
            );
            TodoModule.addTodo(todoObj);
            domModule.emptyFormDataAfterSubmission();
            domModule.flashMessage("TODO created successfully !!");
        } else {
            alert("TITLE + DESCRIPTION of TODO must be of minimum length : 3");
        }
        localStorage.setItem("todoItems", JSON.stringify(TodoModule.todo_array));
        domModule.displayTodoList();
        e.preventDefault();
    });
};

createProjectForm();
createTodoForm();

dom.displayProjectList();
dom.displayTodoList();
//dom.deleteTodo(todoIndex);
//projectAction();