!function(e){var t={};function o(r){if(t[r])return t[r].exports;var n=t[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=t,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(r,n,function(t){return e[t]}.bind(null,n));return r},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}([function(e,t,o){"use strict";o.r(t);const r=(e,t,o,r="NOT IMPORTANT",n="GENERAL",d="INCOMPLETE")=>({title:e,description:t,dueDate:o,priority:r,projectName:n,status:d}),n=function(){const e={};return e.projectList=localStorage.getItem("projectItems")?JSON.parse(localStorage.getItem("projectItems")):["GENERAL"],e.addProject=function(t){e.projectList.push(t),localStorage.setItem("projectItems",JSON.stringify(e.projectList))},e.removeProject=function(t){const o=e.projectList.indexOf(t);-1!==o&&e.projectList.splice(o,1),localStorage.setItem("projectItems",JSON.stringify(e.projectList))},e.returnAllProjects=function(){return e.projectList},e}(),d=function(){const e={};return e.todo_array=localStorage.getItem("todoItems")?JSON.parse(localStorage.getItem("todoItems")):[],e.addTodo=function(e){d.todo_array.push(e),localStorage.setItem("todoItems",JSON.stringify(d.todo_array))},e.updateTodo=function(e,t){d.todo_array[t]=e,localStorage.setItem("todoItems",JSON.stringify(d.todo_array))},e.removeTodo=function(e){d.todo_array.splice(e,1)},e}(),c='\n<form id="todo-form" action="">\n<input type="hidden" name="project" value="GENERAL" required>\n<input type="text" name="title" placeholder="Todo Title" required>\n<input type="text" name="description" placeholder="Todo Description" required>\n<input type="date" name="dueDate" placeholder="Todo Due Date" required>\n<select name="priority" id="">\n    <option value="IMPORTANT">IMPORTANT</option>\n    <option value="NOT IMPORTANT">NOT IMPORTANT</option>\n</select>\n    <select name="status" id="">\n            <option value="INCOMPLETE">INCOMPLETE</option>\n            <option value="COMPLETE">COMPLETE</option>\n    </select>\n<button type="submit">SUBMIT</button>\n</form>',i=n.returnAllProjects(),a=document.querySelector("#form-holder");let l=0;const u=function(){let e={displayProjectList:function(){const e=document.querySelector("#project-list");e.innerHTML="",i.forEach(function(t,o){let r=document.createElement("div");r.innerHTML=t,e.insertAdjacentElement("beforeend",r),u.listenClicksOnProjectNames()}),document.querySelector("#project-list > div:nth-child(1)").classList.add("currently_select_project")},listenClicksOnProjectNames:()=>{const e=document.querySelectorAll("#project-list div"),t=document.querySelector("#project-title");e.forEach((e,o)=>{e.addEventListener("click",r=>{u.emptyFlashMessage();const n=document.querySelectorAll("#project-list > div");for(let e of n)e.classList.contains("currently_select_project")&&e.classList.remove("currently_select_project");e.classList.add("currently_select_project"),l=o,t.innerHTML=i[l],a.innerHTML="",u.displayTodoList(),r.preventDefault()})})},displayTodoList:function(){const e=document.querySelector("table#todo-list");let t="";0===d.todo_array.length?e.innerHTML="":t="\n            <thead>\n                    <td>NO</td>\n                    <td>Title</td>\n                    <td>Description</td>\n                    <td>Due Date</td>\n                    <td>Priority</td>\n                    <td>Status</td>\n                    <td>Edit</td>\n                    <td>Delete</td>\n                </thead>\n            ";let o=t,r=0;d.todo_array.forEach(function(e,t){const n=e.title,d=e.description,c=e.dueDate,a=e.priority,u=e.status;i[l]===e.projectName&&(o+=`<tr>\n            <td>${r+=1}</td>\n            <td>${n}</td>\n            <td>${d}</td>\n            <td>${c}</td>\n            <td>${a}</td>\n            <td>${u}</td>\n            <td><button data-index="${t}" onclick="rePopulateEditForm(${t})">Edit Todo</button></td>\n            <td><button data-index="${t}" onclick="deleteTodoRow(${t})">Delete</button></td>\n        </tr>`)}),0===r&&(o="",u.flashMessage("No to-do yet...... !!")),e.innerHTML=o},collectTodoEditedInfo:function(e){const t=document.querySelector('#todo-form [name="title"]').value,o=document.querySelector('#todo-form [name="description"]').value,n=document.querySelector('#todo-form [name="dueDate"]').value,c=document.querySelector('#todo-form [name="project"]').value,i=document.querySelector('#todo-form [name="priority"]').value,a=document.querySelector('#todo-form [name="status"]').value;if(t.length>2&&o.length>2&&n.length>2){let l=r(t,o,n,i,c,a);d.updateTodo(l,e),u.emptyFormDataAfterSubmission(),u.flashMessage("TODO edited successfully !!"),u.displayTodoList()}},flashMessage:function(e){let t=document.querySelector("#flash-message");t.innerHTML=e,setTimeout(function(){t.innerHTML="<br/>"},6e3)},emptyFlashMessage:function(){document.querySelector("#flash-message").innerHTML=""},emptyFormDataAfterSubmission:function(){document.querySelector('#todo-form [name="title"]').value="",document.querySelector('#todo-form [name="description"]').value="",document.querySelector('#todo-form [name="dueDate"]').value=""}};return e}();window.deleteTodoRow=function(e){d.removeTodo(e),localStorage.setItem("todoItems",JSON.stringify(d.todo_array)),u.flashMessage("TODO deleted successfully !!"),u.displayTodoList()},window.rePopulateEditForm=function(e){a.innerHTML=c,document.querySelector('#todo-form [name="title"]').value=d.todo_array[e].title,document.querySelector('#todo-form [name="description"]').value=d.todo_array[e].description,document.querySelector('#todo-form [name="dueDate"]').value=d.todo_array[e].dueDate,document.querySelector('#todo-form [name="project"]').value=d.todo_array[e].projectName;const{priority:t}=d.todo_array[e],o=document.querySelector('#todo-form [name="priority"]');"IMPORTANT"===t?(o.options[0]=new Option("IMPORTANT","IMPORTANT"),o.options[1]=new Option("NOT IMPORTANT","NOT IMPORTANT")):(o.options[0]=new Option("NOT IMPORTANT","NOT IMPORTANT"),o.options[1]=new Option("IMPORTANT","IMPORTANT"));const{status:r}=d.todo_array[e],n=document.querySelector('#todo-form [name="status"]');"COMPLETE"===r?(n.options[0]=new Option("COMPLETE","COMPLETE"),n.options[1]=new Option("INCOMPLETE","INCOMPLETE")):(n.options[0]=new Option("INCOMPLETE","INCOMPLETE"),n.options[1]=new Option("COMPLETE","COMPLETE")),document.querySelector("#todo-form").addEventListener("submit",t=>{u.collectTodoEditedInfo(e),t.preventDefault()})};const s=u,m=document.querySelector("#form-holder");let p=n.returnAllProjects();document.querySelector("#project-button").addEventListener("click",()=>{m.innerHTML='\n<form id="project-form" action="#">\n    <input type="text" name="name" placeholder="Project Name" required>\n    <button type="submit">SUBMIT</button>\n</form>',document.querySelector("#project-form").addEventListener("submit",e=>{const t=document.querySelector('#project-form [name="name"]').value;t.length>0&&(p.includes(t)?alert("Project Already exists !!"):(n.addProject(t),u.flashMessage("Project created successfully !!"))),u.displayProjectList(),u.displayTodoList(),e.preventDefault()})}),document.querySelector("#todo-button").addEventListener("click",()=>{m.innerHTML=c,document.querySelector("#todo-form input:nth-child(1)").value=p[l],document.querySelector("#todo-form").addEventListener("submit",e=>{const t=document.querySelector('#todo-form [name="title"]').value,o=document.querySelector('#todo-form [name="description"]').value,n=document.querySelector('#todo-form [name="dueDate"]').value,c=document.querySelector('#todo-form [name="project"]').value,i=document.querySelector('#todo-form [name="priority"]').value,a=document.querySelector('#todo-form [name="status"]').value;if(t.length>2&&o.length>2&&n.length>2){const e=r(t,o,n,i,c,a);d.addTodo(e),u.emptyFormDataAfterSubmission(),u.flashMessage("TODO created successfully !!")}else alert("TITLE + DESCRIPTION of TODO must be of minimum length : 3");localStorage.setItem("todoItems",JSON.stringify(d.todo_array)),u.displayTodoList(),e.preventDefault()})}),s.displayProjectList(),s.displayTodoList(),document.querySelector("#delete-project-link").addEventListener("click",()=>{if("GENERAL"===p[l])alert("Cannot delete GENERAL project");else{if(0!==d.todo_array.length){const e=[];d.todo_array.forEach(t=>{p[l]===t.projectName&&e.push(t)}),d.todo_array=d.todo_array.filter(t=>!e.includes(t)),localStorage.setItem("todoItems",JSON.stringify(d.todo_array))}n.removeProject(p[l])}document.location.reload()})}]);