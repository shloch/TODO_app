const projectForm = `
<form id="project-form" action="#">
    <input type="text" name="name">
    <button type="submit">SUBMIT</button>
</form>`;

const todoForm = `
<form id="todo-form" action="">
<input type="text" name="title">
<input type="text" name="description">
<input type="date" name="dueDate">
<select name="priority" id="">
    <option value="IMPORTANT">IMPORTANT</option>
    <option value="NOT IMPORTANT">NOT IMPORTANT</option>
</select>
<select name="project" id="">
        <option value="GENERAL">GENERAL</option>
</select>
    <select name="status" id="">
            <option value="COMPLETE">COMPLETE</option>
            <option value="INCOMPLETE">INCOMPLETE</option>
    </select>
<button type="submit">SUBMIT</button>
</form>`;

export { projectForm, todoForm };