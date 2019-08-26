import { projectForm, todoForm } from './forms'
// import { createProject, createTodo, todo_array } from './newModule'
import { ProjectModule } from './projectModule'
import { todo } from './TODO_factory'

let projects = ProjectModule.returnAllProjects();
let todo_array = [];
let current_project = 0;

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
        domModule.displayProjectList();
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

const projectAction = () => {
    const projectElems = document.querySelectorAll('#project-list div');
    projectElems.forEach((element, index)=>{
        element.addEventListener('click', (e)=>{
            current_project = index;
            console.log(projects[current_project]);
            e.preventDefault();
        })
    })    
}

const domModule = (function() {
    let mod = {}
    let form_holder = document.querySelector("#form-holder");

    mod.createProjectForm = function() {
        let projectButton = document.querySelector('#project-button');
        projectButton.addEventListener('click', () => {
            form_holder.innerHTML = projectForm;         
            createProject()
        });
    };

    mod.createTodoForm = function() {
        let todoButton = document.querySelector('#todo-button');
        todoButton.addEventListener('click', () => {
            form_holder.innerHTML = todoForm; 
            let todoProject = document.querySelector('#todo-form input:nth-child(1)');

            if (projects[current_project] != "GENERAL") {
                todoProject.value = projects[current_project]
                console.log(todoProject.value)
            }           
            createTodo()
        });
    };

    mod.displayProjectList = function() {
        let projectPane = document.querySelector('#project-list')
        projectPane.innerHTML = "";
        projects.forEach(function (project, index) {
            let div = document.createElement('div');
            div.innerHTML = project;
            projectPane.insertAdjacentElement("beforeend", div);
            projectAction()
        })
    }

    return mod;
})();
export { domModule, todo_array, projectAction };