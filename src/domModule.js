import { projectForm, todoForm } from "./forms";
// import { createProject, createTodo, todo_array } from './newModule'
import { ProjectModule } from "./projectModule";
import { todo } from "./TODO_factory";

let projects = ProjectModule.returnAllProjects();
let form_holder = document.querySelector("#form-holder");
let todo_array = localStorage.getItem("todoItems") ?
    JSON.parse(localStorage.getItem("todoItems")) :
    [];
let current_project = 0;

const saveProject = () => {
    const name = document.querySelector('#project-form [name="name"]').value;
    if (name.length > 0) {
        ProjectModule.addProject(name);
    }
};

const saveTodo = () => {
    const title = document.querySelector('#todo-form [name="title"]').value;
    const description = document.querySelector('#todo-form [name="description"]')
        .value;
    const dueDate = document.querySelector('#todo-form [name="dueDate"]').value;
    const project = document.querySelector('#todo-form [name="project"]').value;
    const priority = document.querySelector('#todo-form [name="priority"]').value;
    const status = document.querySelector('#todo-form [name="status"]').value;

    if (title.length > 2 && description.length > 2 && dueDate.length > 2) {
        todo_array.push(
            todo(title, description, dueDate, priority, project, status)
        );
    }
    localStorage.setItem("todoItems", JSON.stringify(todo_array));
    domModule.displayTodoList();

    console.log(typeof todo_array);
    //console.log(todo_array[todo_array.length-1].title());
};

const createProject = () => {
    const projectSubmit = document.querySelector("#project-form");
    projectSubmit.addEventListener("submit", e => {
        saveProject();
        domModule.displayProjectList();
        domModule.displayTodoList();
        console.log(ProjectModule.returnAllProjects());
        e.preventDefault();
    });
};

const createTodo = () => {
    const todoSubmit = document.querySelector("#todo-form");
    todoSubmit.addEventListener("submit", e => {
        saveTodo();
        e.preventDefault();
    });
};

const projectAction = () => {
    const projectElems = document.querySelectorAll("#project-list div");
    const projectTitle = document.querySelector("#project-title");
    projectElems.forEach((element, index) => {
        element.addEventListener("click", e => {
            current_project = index;
            projectTitle.innerHTML = projects[current_project];
            form_holder.innerHTML = "";
            domModule.displayTodoList();
            console.log(projects[current_project]);
            e.preventDefault();
        });
    });
};

const domModule = (function() {
    let mod = {};

    mod.createProjectForm = function() {
        let projectButton = document.querySelector("#project-button");
        projectButton.addEventListener("click", () => {
            form_holder.innerHTML = projectForm;
            createProject();
        });
    };

    mod.createTodoForm = function() {
        let todoButton = document.querySelector("#todo-button");
        todoButton.addEventListener("click", () => {
            form_holder.innerHTML = todoForm;
            let todoProject = document.querySelector("#todo-form input:nth-child(1)");

            // if (projects[current_project] != "GENERAL") {
            todoProject.value = projects[current_project];
            console.log(todoProject.value);
            // }
            createTodo();
        });
    };

    mod.displayProjectList = function() {
        let projectPane = document.querySelector("#project-list");
        projectPane.innerHTML = "";
        projects.forEach(function(project, index) {
            let div = document.createElement("div");
            div.innerHTML = project;
            projectPane.insertAdjacentElement("beforeend", div);
            projectAction();
        });
    };

    mod.displayTodoList = function() {
        const todoTable = document.querySelector("table#todo-list");
        if (todo_array.length == 0) return [];
        let thead = `
        <thead>
                <td>NO</td>
                <td>Title</td>
                <td>Description</td>
                <td>Due Date</td>
                <td>Priority</td>
                <td>Status</td>
                <td>Edit</td>
                <td>Delete</td>
            </thead>
        `;
        let data = thead;
        let order = 0;
        todo_array.forEach(function(todo, index) {
            let title = todo.title;
            let description = todo.description;
            let dueDate = todo.dueDate;
            let priority = todo.priority;
            let status = todo.status;

            if (projects[current_project] === todo.projectName) {
                order = order + 1;
                data += `<tr>
            <td>${order}</td>
            <td>${title}</td>
            <td>${description}</td>
            <td>${dueDate}</td>
            <td>${priority}</td>
            <td>${status}</td>
            <td><button data-index="${index}" onclick="editTodo(${index})">Edit Todo</button></td>
            <td><button data-index="${index}" onclick="deleteTodoRow(${index})">Delete</button></td>
        </tr>`;
            }
        });

        todoTable.innerHTML = data;
    };

    return mod;
})();

export { domModule, todo_array, projectAction };