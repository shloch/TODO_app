'use strict';

let todo_array = [];

import { todo } from "./TODO_factory";
import { ProjectModule } from "./projectModule";
import { domModule } from "./domModule";

let todo2 = todo('title', 'description', 'dueDate', 'priority');
let dom = domModule;
const runApp = () => {
    dom.createProjectForm()
    dom.createTodoForm()
}

runApp();