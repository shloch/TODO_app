'use strict';

import { todo } from "./TODO_factory";
import { ProjectModule } from "./projectModule";
import { domModule, todo_array, projectAction } from "./domModule";

let dom = domModule;

dom.createProjectForm()
dom.createTodoForm()
dom.displayProjectList()
dom.displayTodoList()
projectAction()


// console.log(todo_array)
// console.log(ProjectModule.returnAllProjects())