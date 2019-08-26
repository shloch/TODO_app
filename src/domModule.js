import { projectForm, todoForm } from './forms'
import { createProject, createTodo, todo_array } from './newModule'

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
            createTodo()
        });
    };


    return mod;
})();
export { domModule, todo_array };