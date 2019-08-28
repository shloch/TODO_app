import { projectForm, todoForm } from "./forms";
import { ProjectModule } from "./projectModule";
import { todo } from "./TODO_factory";
import { TodoModule } from "./todoModule";

let projects = ProjectModule.returnAllProjects();
let form_holder = document.querySelector("#form-holder");
let current_project = 0;

window.rePopulateEditForm = function(index) {
    let form_holder = document.querySelector("#form-holder");
    form_holder.innerHTML = todoForm;
    document.querySelector('#todo-form [name="title"]').value =
        TodoModule.todo_array[index].title;
    document.querySelector('#todo-form [name="description"]').value =
        TodoModule.todo_array[index].description;
    document.querySelector('#todo-form [name="dueDate"]').value =
        TodoModule.todo_array[index].dueDate;
    document.querySelector('#todo-form [name="project"]').value =
        TodoModule.todo_array[index].projectName;

    //
    const priority = TodoModule.todo_array[index].priority;
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
    const status = TodoModule.todo_array[index].status;
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
        domModule.collectTodoEditedInfo(index);
        e.preventDefault();
    });
};

window.deleteTodoRow = function(index) {
    TodoModule.removeTodo(index);
    localStorage.setItem("todoItems", JSON.stringify(TodoModule.todo_array));
    domModule.flashMessage("TODO deleted successfully !!");
    domModule.displayTodoList();
};

const domModule = (function() {
    let mod = {};

    mod.displayProjectList = function() {
        let projectPane = document.querySelector("#project-list");
        projectPane.innerHTML = "";
        projects.forEach(function(project, index) {
            let div = document.createElement("div");
            div.innerHTML = project;
            projectPane.insertAdjacentElement("beforeend", div);
            domModule.listenClicksOnProjectNames();
        });
        let firstProject = document.querySelector(
            "#project-list > div:nth-child(1)"
        );
        firstProject.classList.add("currently_select_project");
    };

    mod.listenClicksOnProjectNames = () => {
        const projectElems = document.querySelectorAll("#project-list div");
        const projectTitle = document.querySelector("#project-title");
        projectElems.forEach((element, index) => {
            element.addEventListener("click", e => {
                domModule.emptyFlashMessage();
                let AllProjects = document.querySelectorAll("#project-list > div");
                for (let Project of AllProjects) {
                    if (Project.classList.contains("currently_select_project")) {
                        Project.classList.remove("currently_select_project");
                    }
                }
                element.classList.add("currently_select_project");
                current_project = index;
                projectTitle.innerHTML = projects[current_project];
                form_holder.innerHTML = "";
                domModule.displayTodoList();
                e.preventDefault();
            });
        });
    };

    mod.displayTodoList = function() {
        const todoTable = document.querySelector("table#todo-list");
        let thead = "";
        if (TodoModule.todo_array.length == 0) {
            return [];
        } else {
            thead = `
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
        }

        let data = thead;
        let order = 0;
        TodoModule.todo_array.forEach(function(todo, index) {
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
            <td><button data-index="${index}" onclick="rePopulateEditForm(${index})">Edit Todo</button></td>
            <td><button data-index="${index}" onclick="deleteTodoRow(${index})">Delete</button></td>
        </tr>`;
            }
        });
        if (order == 0) {
            data = "";
            domModule.flashMessage("No to-do yet...... !!");
        }

        todoTable.innerHTML = data;
    };

    mod.collectTodoEditedInfo = function(index) {
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
            let editedTodo_obj = todo(
                title,
                description,
                dueDate,
                priority,
                project,
                status
            );
            TodoModule.updateTodo(editedTodo_obj, index);
            domModule.emptyFormDataAfterSubmission();
            domModule.flashMessage("TODO edited successfully !!");
            domModule.displayTodoList();
        }
    };

    mod.flashMessage = function(message) {
        let flashdiv = document.querySelector("#flash-message");
        flashdiv.innerHTML = message;
        setTimeout(function() {
            flashdiv.innerHTML = "<br/>";
        }, 6000);
    };

    mod.emptyFlashMessage = function() {
        let flashdiv = document.querySelector("#flash-message");
        flashdiv.innerHTML = "";
    };

    mod.emptyFormDataAfterSubmission = function() {
        document.querySelector('#todo-form [name="title"]').value = "";
        document.querySelector('#todo-form [name="description"]').value = "";
        document.querySelector('#todo-form [name="dueDate"]').value = "";
    };

    return mod;
})();

export { domModule };