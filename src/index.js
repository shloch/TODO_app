"use strict";

import { todo } from "./TODO_factory";
import { ProjectModule } from "./projectModule";
import { domModule, todo_array, projectAction } from "./domModule";
import { todoForm } from "./forms";

let dom = domModule;

dom.createProjectForm();
dom.createTodoForm();
dom.displayProjectList();
dom.displayTodoList();
//dom.deleteTodo(todoIndex);
projectAction();

window.deleteTodoRow = function(index) {
    todo_array.splice(index, 1);
    dom.displayTodoList();
};

const updateTodo = index => {
    const title = document.querySelector('#todo-form [name="title"]').value;
    const description = document.querySelector('#todo-form [name="description"]')
        .value;
    const dueDate = document.querySelector('#todo-form [name="dueDate"]').value;
    const project = document.querySelector('#todo-form [name="project"]').value;
    const priority = document.querySelector('#todo-form [name="priority"]').value;
    const status = document.querySelector('#todo-form [name="status"]').value;

    if (title.length > 2 && description.length > 2 && dueDate.length > 2) {
        todo_array[index] = todo(
            title,
            description,
            dueDate,
            priority,
            project,
            status
        );
        domModule.displayTodoList();
    }

    console.log(todo_array);
};

window.editTodo = function(index) {
    let form_holder = document.querySelector("#form-holder");
    form_holder.innerHTML = todoForm;
    document.querySelector('#todo-form [name="title"]').value = todo_array[
        index
    ].getTitle();
    document.querySelector('#todo-form [name="description"]').value = todo_array[
        index
    ].getDescription();
    document.querySelector('#todo-form [name="dueDate"]').value = todo_array[
        index
    ].getdueDate();
    document.querySelector('#todo-form [name="project"]').value = todo_array[
        index
    ].getProjectName();

    //
    const priority = todo_array[index].getPriority();
    const priority_select = document.querySelector(
        '#todo-form [name="priority"]'
    );
    if (priority == "IMPORTANT") {
        priority_select.options[0] = new Option("IMPORTANT", "IMPORTANT");
        priority_select.options[1] = new Option("NOT IMPORTANT", "NOT IMPORTANT");
    } else {
        priority_select.options[0] = new Option("NOT IMPORTANT", "NOT IMPORTANT");
        priority_select.options[1] = new Option("IMPORTANT", "IMPORTANT");
    }
    //
    const status = todo_array[index].getStatus();
    const status_select = document.querySelector('#todo-form [name="status"]');
    if (status == "COMPLETE") {
        status_select.options[0] = new Option("COMPLETE", "COMPLETE");
        status_select.options[1] = new Option("INCOMPLETE", "INCOMPLETE");
    } else {
        status_select.options[0] = new Option("INCOMPLETE", "INCOMPLETE");
        status_select.options[1] = new Option("COMPLETE", "COMPLETE");
    }

    const todoSubmit = document.querySelector("#todo-form");
    todoSubmit.addEventListener("submit", e => {
        updateTodo(index);
        e.preventDefault();
    });
};
// console.log(todo_array)
// console.log(ProjectModule.returnAllProjects())