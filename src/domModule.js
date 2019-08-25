import { projectForm, todoForm } from './forms'

const domModule = (function() {
    let mod = {}
    let form_holder = document.querySelector("#form-holder");

    mod.createProjectForm = function() {
        let projectButton = document.querySelector('#project-button');
        projectButton.addEventListener('click', () => {
            form_holder.innerHTML = projectForm;
        });
    };

    mod.createTodoForm = function() {
        let todoButton = document.querySelector('#todo-button');
        todoButton.addEventListener('click', () => {
            form_holder.innerHTML = todoForm;
        });
    };


    return mod;
})();
export { domModule };