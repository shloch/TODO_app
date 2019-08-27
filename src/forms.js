import { ProjectModule } from "./projectModule";
let projects = ProjectModule.returnAllProjects();
const projectForm = `
<form id="project-form" action="#">
    <input type="text" name="name" required>
    <button type="submit">SUBMIT</button>
</form>`;

const todoForm = `
<form id="todo-form" action="">
<input type="hidden" name="project" value="GENERAL" required>
<input type="text" name="title" required>
<input type="text" name="description" required>
<input type="date" name="dueDate" required>
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

export { projectForm, todoForm };