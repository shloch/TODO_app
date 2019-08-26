'use strict';

import { todo } from "./TODO_factory";
import { ProjectModule } from "./projectModule";
import { domModule, todo_array } from "./domModule";

let dom = domModule;

dom.createProjectForm()
dom.createTodoForm()
dom.displayProjectList()


console.log(todo_array)
console.log(ProjectModule.returnAllProjects())