const ProjectModule = (function () {
  const mod = {};
  mod.projectList = localStorage.getItem("projectItems") ?
    JSON.parse(localStorage.getItem("projectItems")) : ["GENERAL"];
  mod.addProject = function (newProjectName) {
    mod.projectList.push(newProjectName);
    localStorage.setItem("projectItems", JSON.stringify(mod.projectList));
  };
  mod.removeProject = function (projectName) {
    let idx = mod.projectList.indexOf(projectName);
    console.log("prj indx =" + idx);

    if (idx != -1) {
      mod.projectList.splice(idx, 1);
    }
    localStorage.setItem("projectItems", JSON.stringify(mod.projectList));
    console.log(mod.projectList);
  };

  mod.returnAllProjects = function () {
    return mod.projectList;
  };

  return mod;
})();

export {
  ProjectModule
};