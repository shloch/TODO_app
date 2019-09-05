const TodoModule = (function todoCRUD() {
  const mod = {};
  mod.todo_array = localStorage.getItem('todoItems')
    ? JSON.parse(localStorage.getItem('todoItems')) : [];
  mod.addTodo = function addTodoFunction(newTodoObj) {
    TodoModule.todo_array.push(newTodoObj);
    localStorage.setItem('todoItems', JSON.stringify(TodoModule.todo_array));
  };
  mod.updateTodo = function updateTodoFunction(editedTodoObj, index) {
    TodoModule.todo_array[index] = editedTodoObj;
    localStorage.setItem('todoItems', JSON.stringify(TodoModule.todo_array));
  };
  mod.removeTodo = function removeTodoFunction(todoIndex) {
    TodoModule.todo_array.splice(todoIndex, 1);
  };

  return mod;
}());

export {
  // eslint-disable-next-line import/prefer-default-export
  TodoModule,
};
