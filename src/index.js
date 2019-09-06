/* eslint-disable arrow-parens */
/* eslint-disable no-alert */
import {
  todo,
} from './TODO_factory';
import {
  ProjectModule,
} from './projectModule';
import {
  domModule,
  currentProject,
  projects,
} from './domModule';
import {
  todoForm,
  projectForm,
} from './forms';
import {
  TodoModule,
} from './todoModule';

const dom = domModule;
const formHolder = document.querySelector('#form-holder');

const createProject = () => {
  const projectSubmit = document.querySelector('#project-form');
  projectSubmit.addEventListener('submit', (e) => {
    const name = document.querySelector('#project-form [name="name"]').value;
    if (name.length > 0) {
      if (!projects.includes(name)) {
        ProjectModule.addProject(name);
        projectSubmit.reset();
        domModule.flashMessage('Project created successfully !!');
      } else {
        alert('Project Already exists !!');
      }
    }
    domModule.displayProjectList();
    domModule.displayTodoList();
    e.preventDefault();
  });
};

const createProjectForm = function createProjectForm() {
  const projectButton = document.querySelector('#project-button');
  projectButton.addEventListener('click', () => {
    formHolder.innerHTML = projectForm;
    createProject();
  });
};

const deleteProject = function TheDeleteProjectFunction() {
  const deleteProjectLink = document.querySelector('#delete-project-link');
  deleteProjectLink.addEventListener('click', () => {
    if (projects[currentProject] === 'GENERAL') {
      alert('Cannot delete GENERAL project');
    } else {
      // remove all todos
      if (TodoModule.todo_array.length !== 0) {
        const arr2delete = [];
        TodoModule.todo_array.forEach((toDo) => {
          if (projects[currentProject] === toDo.projectName) {
            arr2delete.push(toDo);
          }
        });
        TodoModule.todo_array = TodoModule.todo_array.filter(n => !arr2delete.includes(n));
        localStorage.setItem('todoItems', JSON.stringify(TodoModule.todo_array));
      }
      ProjectModule.removeProject(projects[currentProject]);
    }
    document.location.reload();
  });
};

// todo
const createTodo = () => {
  const todoSubmit = document.querySelector('#todo-form');
  todoSubmit.addEventListener('submit', (e) => {
    const title = document.querySelector('#todo-form [name="title"]').value;
    const description = document.querySelector('#todo-form [name="description"]').value;
    const dueDate = document.querySelector('#todo-form [name="dueDate"]').value;
    const project = document.querySelector('#todo-form [name="project"]').value;
    const priority = document.querySelector('#todo-form [name="priority"]')
      .value;
    const status = document.querySelector('#todo-form [name="status"]').value;

    if (title.length > 2 && description.length > 2 && dueDate.length > 2) {
      const todoObj = todo(title, description, dueDate, priority, project, status);
      TodoModule.addTodo(todoObj);
      domModule.emptyFormDataAfterSubmission();
      domModule.flashMessage('TODO created successfully !!');
    } else {
      alert('TITLE + DESCRIPTION of TODO must be of minimum length : 3');
    }
    localStorage.setItem('todoItems', JSON.stringify(TodoModule.todo_array));
    domModule.displayTodoList();
    e.preventDefault();
  });
};

const createTodoForm = function theCreateTodoFormFunction() {
  const todoButton = document.querySelector('#todo-button');
  todoButton.addEventListener('click', () => {
    formHolder.innerHTML = todoForm;
    const todoProject = document.querySelector('#todo-form input:nth-child(1)');
    todoProject.value = projects[currentProject];
    createTodo();
  });
};

createProjectForm();
createTodoForm();
dom.displayProjectList();
dom.displayTodoList();
deleteProject();
