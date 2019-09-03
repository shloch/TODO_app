const projectForm = `
<form id="project-form" action="#">
    <input type="text" name="name" placeholder="Project Name" required>
    <button type="submit">SUBMIT</button>
</form>`;

const todoForm = `
<form id="todo-form" action="">
<input type="hidden" name="project" value="GENERAL" required>
<input type="text" name="title" placeholder="Todo Title" required>
<input type="text" name="description" placeholder="Todo Description" required>
<input type="date" name="dueDate" placeholder="Todo Due Date" required>
<select name="priority" id="">
    <option value="IMPORTANT">IMPORTANT</option>
    <option value="NOT IMPORTANT">NOT IMPORTANT</option>
</select>
    <select name="status" id="">
            <option value="INCOMPLETE">INCOMPLETE</option>
            <option value="COMPLETE">COMPLETE</option>
    </select>
<button type="submit">SUBMIT</button>
</form>`;

export {
  projectForm,
  todoForm
};