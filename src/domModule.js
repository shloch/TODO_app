import {
  ProjectModule,
} from './projectModule';
import {
  todo,
} from './TODO_factory';
import {
  TodoModule,
} from './todoModule';
import {
  todoForm,
} from './forms';

const projects = ProjectModule.returnAllProjects();
const formHolder = document.querySelector('#form-holder');
let currentProject = 0;

const domModule = (function () {
  let mod = {};

  mod.displayProjectList = function () {
    const projectPane = document.querySelector('#project-list');
    projectPane.innerHTML = '';
    projects.forEach(function (project, index) {
      let div = document.createElement('div');
      div.innerHTML = project;
      projectPane.insertAdjacentElement('beforeend', div);
      domModule.listenClicksOnProjectNames();
    });
    const firstProject = document.querySelector(
      '#project-list > div:nth-child(1)'
    );
    firstProject.classList.add('currently_select_project');
  };

  mod.listenClicksOnProjectNames = () => {
    const projectElems = document.querySelectorAll('#project-list div');
    const projectTitle = document.querySelector('#project-title');
    projectElems.forEach((element, index) => {
      element.addEventListener("click", (e) => {
        domModule.emptyFlashMessage();
        const AllProjects = document.querySelectorAll('#project-list > div');
        for (let Project of AllProjects) {
          if (Project.classList.contains('currently_select_project')) {
            Project.classList.remove('currently_select_project');
          }
        }
        element.classList.add('currently_select_project');
        currentProject = index;
        projectTitle.innerHTML = projects[currentProject];
        formHolder.innerHTML = "";
        domModule.displayTodoList();
        e.preventDefault();
      });
    });
  };

  mod.displayTodoList = function () {
    const todoTable = document.querySelector('table#todo-list');
    let thead = '';
    if (TodoModule.todo_array.length === 0) {
      todoTable.innerHTML = '';
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
    TodoModule.todo_array.forEach(function (todo, index) {
      const title = todo.title;
      const description = todo.description;
      const dueDate = todo.dueDate;
      const priority = todo.priority;
      const status = todo.status;

      if (projects[currentProject] === todo.projectName) {
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
    if (order === 0) {
      data = "";
      domModule.flashMessage("No to-do yet...... !!");
    }

    todoTable.innerHTML = data;
  };

  mod.collectTodoEditedInfo = function (index) {
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
      domModule.flashMessage('TODO edited successfully !!');
      domModule.displayTodoList();
    }
  };

  mod.flashMessage = function (message) {
    let flashdiv = document.querySelector('#flash-message');
    flashdiv.innerHTML = message;
    setTimeout(function () {
      flashdiv.innerHTML = '<br/>';
    }, 6000);
  };

  mod.emptyFlashMessage = function () {
    let flashdiv = document.querySelector('#flash-message');
    flashdiv.innerHTML = '';
  };

  mod.emptyFormDataAfterSubmission = function () {
    document.querySelector('#todo-form [name="title"]').value = '';
    document.querySelector('#todo-form [name="description"]').value = '';
    document.querySelector('#todo-form [name="dueDate"]').value = '';
  };

  return mod;
})();

window.deleteTodoRow = function (index) {
  TodoModule.removeTodo(index);
  localStorage.setItem('todoItems', JSON.stringify(TodoModule.todo_array));
  domModule.flashMessage('TODO deleted successfully !!');
  domModule.displayTodoList();
};

window.rePopulateEditForm = function (index) {
  formHolder.innerHTML = todoForm;
  document.querySelector('#todo-form [name="title"]').value = TodoModule.todo_array[index].title;
  document.querySelector('#todo-form [name="description"]').value = TodoModule.todo_array[index].description;
  document.querySelector('#todo-form [name="dueDate"]').value = TodoModule.todo_array[index].dueDate;
  document.querySelector('#todo-form [name="project"]').value = TodoModule.todo_array[index].projectName;

  const { priority } = TodoModule.todo_array[index];
  const prioritySelect = document.querySelector(
    '#todo-form [name="priority"]'
  );
  if (priority === 'IMPORTANT') {
    prioritySelect.options[0] = new Option('IMPORTANT', 'IMPORTANT');
    prioritySelect.options[1] = new Option('NOT IMPORTANT', 'NOT IMPORTANT');
  } else {
    prioritySelect.options[0] = new Option('NOT IMPORTANT', 'NOT IMPORTANT');
    prioritySelect.options[1] = new Option('IMPORTANT', 'IMPORTANT');
  }

  const { status } = TodoModule.todo_array[index];
  const status_select = document.querySelector('#todo-form [name="status"]');
  if (status === 'COMPLETE') {
    status_select.options[0] = new Option('COMPLETE', 'COMPLETE');
    status_select.options[1] = new Option('INCOMPLETE', 'INCOMPLETE');
  } else {
    status_select.options[0] = new Option('INCOMPLETE', 'INCOMPLETE');
    status_select.options[1] = new Option('COMPLETE', 'COMPLETE');
  }

  const todoSubmit = document.querySelector('#todo-form');
  todoSubmit.addEventListener('submit', e => {
    domModule.collectTodoEditedInfo(index);
    e.preventDefault();
  });
};

export {
  domModule,
  currentProject
};