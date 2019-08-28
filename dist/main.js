!function(e){var t={};function o(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}([function(e,t,o){"use strict";o.r(t);const n=(e,t,o,n="NOT IMPORTANT",r="GENERAL",c="INCOMPLETE")=>({title:e,description:t,dueDate:o,priority:n,projectName:r,status:c});var r=function(){let e=localStorage.getItem("projectItems")?JSON.parse(localStorage.getItem("projectItems")):["GENERAL"],t={addProject:function(t){e.push(t),localStorage.setItem("projectItems",JSON.stringify(e))},removeProject:function(t){let o=e.indexOf(t);-1!=o&&e.splice(o,1)},returnAllProjects:function(){return e}};return t}();r.returnAllProjects();const c='\n<form id="todo-form" action="">\n<input type="hidden" name="project" value="GENERAL" required>\n<input type="text" name="title" placeholder="Todo Title" required>\n<input type="text" name="description" placeholder="Todo Description" required>\n<input type="date" name="dueDate" placeholder="Todo Due Date" required>\n<select name="priority" id="">\n    <option value="IMPORTANT">IMPORTANT</option>\n    <option value="NOT IMPORTANT">NOT IMPORTANT</option>\n</select>\n    <select name="status" id="">\n            <option value="INCOMPLETE">INCOMPLETE</option>\n            <option value="COMPLETE">COMPLETE</option>\n    </select>\n<button type="submit">SUBMIT</button>\n</form>';let d=r.returnAllProjects(),u=document.querySelector("#form-holder"),l=localStorage.getItem("todoItems")?JSON.parse(localStorage.getItem("todoItems")):[],i=0;const a=()=>{document.querySelector("#project-form").addEventListener("submit",e=>{(()=>{const e=document.querySelector('#project-form [name="name"]').value;e.length>0&&(r.addProject(e),p.flashMessage("Project created successfully !!"))})(),p.displayProjectList(),p.displayTodoList(),e.preventDefault()})},s=()=>{document.querySelector("#todo-form").addEventListener("submit",e=>{(()=>{const e=document.querySelector('#todo-form [name="title"]').value,t=document.querySelector('#todo-form [name="description"]').value,o=document.querySelector('#todo-form [name="dueDate"]').value,r=document.querySelector('#todo-form [name="project"]').value,c=document.querySelector('#todo-form [name="priority"]').value,d=document.querySelector('#todo-form [name="status"]').value;e.length>2&&t.length>2&&o.length>2&&(l.push(n(e,t,o,c,r,d)),p.emptyFormDataAfterSubmission(),p.flashMessage("TODO created successfully !!")),localStorage.setItem("todoItems",JSON.stringify(l)),p.displayTodoList()})(),e.preventDefault()})},m=()=>{const e=document.querySelectorAll("#project-list div"),t=document.querySelector("#project-title");e.forEach((e,o)=>{e.addEventListener("click",n=>{p.emptyFlashMessage();let r=document.querySelectorAll("#project-list > div");for(let e of r)e.classList.contains("currently_select_project")&&e.classList.remove("currently_select_project");e.classList.add("currently_select_project"),i=o,t.innerHTML=d[i],u.innerHTML="",p.displayTodoList(),n.preventDefault()})})},p=function(){let e={createProjectForm:function(){document.querySelector("#project-button").addEventListener("click",()=>{u.innerHTML='\n<form id="project-form" action="#">\n    <input type="text" name="name" placeholder="Project Name" required>\n    <button type="submit">SUBMIT</button>\n</form>',a()})},createTodoForm:function(){document.querySelector("#todo-button").addEventListener("click",()=>{u.innerHTML=c,document.querySelector("#todo-form input:nth-child(1)").value=d[i],s()})},displayProjectList:function(){let e=document.querySelector("#project-list");e.innerHTML="",d.forEach(function(t,o){let n=document.createElement("div");n.innerHTML=t,e.insertAdjacentElement("beforeend",n),m()}),document.querySelector("#project-list > div:nth-child(1)").classList.add("currently_select_project")},displayTodoList:function(){const e=document.querySelector("table#todo-list");let t="";if(0==l.length)return[];let o=t="\n            <thead>\n                    <td>NO</td>\n                    <td>Title</td>\n                    <td>Description</td>\n                    <td>Due Date</td>\n                    <td>Priority</td>\n                    <td>Status</td>\n                    <td>Edit</td>\n                    <td>Delete</td>\n                </thead>\n            ",n=0;l.forEach(function(e,t){let r=e.title,c=e.description,u=e.dueDate,l=e.priority,a=e.status;d[i]===e.projectName&&(o+=`<tr>\n            <td>${n+=1}</td>\n            <td>${r}</td>\n            <td>${c}</td>\n            <td>${u}</td>\n            <td>${l}</td>\n            <td>${a}</td>\n            <td><button data-index="${t}" onclick="editTodo(${t})">Edit Todo</button></td>\n            <td><button data-index="${t}" onclick="deleteTodoRow(${t})">Delete</button></td>\n        </tr>`)}),0==n&&(o="",p.flashMessage("No to-do yet...... !!")),e.innerHTML=o},flashMessage:function(e){let t=document.querySelector("#flash-message");t.innerHTML=e,setTimeout(function(){t.innerHTML="<br/>"},6e3)},emptyFlashMessage:function(){document.querySelector("#flash-message").innerHTML=""},emptyFormDataAfterSubmission:function(){document.querySelector('#todo-form [name="title"]').value="",document.querySelector('#todo-form [name="description"]').value="",document.querySelector('#todo-form [name="dueDate"]').value=""}};return e}();let f=p;f.createProjectForm(),f.createTodoForm(),f.displayProjectList(),f.displayTodoList(),m(),window.deleteTodoRow=function(e){l.splice(e,1),p.flashMessage("TODO deleted successfully !!"),f.displayTodoList()};window.editTodo=function(e){document.querySelector("#form-holder").innerHTML=c,document.querySelector('#todo-form [name="title"]').value=l[e].title,document.querySelector('#todo-form [name="description"]').value=l[e].description,document.querySelector('#todo-form [name="dueDate"]').value=l[e].dueDate,document.querySelector('#todo-form [name="project"]').value=l[e].projectName;const t=l[e].priority,o=document.querySelector('#todo-form [name="priority"]');"IMPORTANT"==t?(o.options[0]=new Option("IMPORTANT","IMPORTANT"),o.options[1]=new Option("NOT IMPORTANT","NOT IMPORTANT")):(o.options[0]=new Option("NOT IMPORTANT","NOT IMPORTANT"),o.options[1]=new Option("IMPORTANT","IMPORTANT"));const r=l[e].status,d=document.querySelector('#todo-form [name="status"]');"COMPLETE"==r?(d.options[0]=new Option("COMPLETE","COMPLETE"),d.options[1]=new Option("INCOMPLETE","INCOMPLETE")):(d.options[0]=new Option("INCOMPLETE","INCOMPLETE"),d.options[1]=new Option("COMPLETE","COMPLETE")),document.querySelector("#todo-form").addEventListener("submit",t=>{(e=>{const t=document.querySelector('#todo-form [name="title"]').value,o=document.querySelector('#todo-form [name="description"]').value,r=document.querySelector('#todo-form [name="dueDate"]').value,c=document.querySelector('#todo-form [name="project"]').value,d=document.querySelector('#todo-form [name="priority"]').value,u=document.querySelector('#todo-form [name="status"]').value;t.length>2&&o.length>2&&r.length>2&&(l[e]=n(t,o,r,d,c,u),localStorage.setItem("todoItems",JSON.stringify(l)),p.emptyFormDataAfterSubmission(),p.flashMessage("TODO edited successfully !!"),p.displayTodoList())})(e),t.preventDefault()})}}]);