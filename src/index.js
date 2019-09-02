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

let deleteProject = function() {
    let deleteProjectLink = document.querySelector("#delete-project-link");
    deleteProjectLink.addEventListener("click", () => {
        if (projects[current_project] == "GENERAL") {
            alert("Cannot delete GENERAL project");
        } else {
            //remove all todos
            console.log(TodoModule.todo_array);
            if (TodoModule.todo_array.length != 0) {
                let arr2delete = [];
                TodoModule.todo_array.forEach(function(todo, todoIndex) {
                    if (projects[current_project] === todo.projectName) {
                        arr2delete.push(todo);
                    }
                });
                TodoModule.todo_array = TodoModule.todo_array.filter(
                    n => !arr2delete.includes(n)
                );
                localStorage.setItem(
                    "todoItems",
                    JSON.stringify(TodoModule.todo_array)
                );
            }
        }
        ProjectModule.removeProject(projects[current_project]);
        document.location.reload();
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
deleteProject();
//dom.deleteTodo(todoIndex);
//projectAction();