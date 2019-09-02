"use strict";

var TodoModule = (function() {
    let mod = {};
    mod.todo_array = localStorage.getItem("todoItems") ?
        JSON.parse(localStorage.getItem("todoItems")) :
        [];
    mod.addTodo = function(newTodoObj) {
        TodoModule.todo_array.push(newTodoObj);
        localStorage.setItem("todoItems", JSON.stringify(TodoModule.todo_array));
    };
    mod.updateTodo = function(editedTodoObj, index) {
        TodoModule.todo_array[index] = editedTodoObj;
        localStorage.setItem("todoItems", JSON.stringify(TodoModule.todo_array));
    };
    mod.removeTodo = function(todoIndex) {
        TodoModule.todo_array.splice(todoIndex, 1);
    };

    return mod;
})();

export { TodoModule };