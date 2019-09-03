const ProjectModule = (function theProjectModuleFunction() {
  const mod = {};
  mod.projectList = localStorage.getItem('projectItems')
    ? JSON.parse(localStorage.getItem('projectItems')) : ['GENERAL'];
  mod.addProject = function theAddProjectFunction(newProjectName) {
    mod.projectList.push(newProjectName);
    localStorage.setItem('projectItems', JSON.stringify(mod.projectList));
  };
  mod.removeProject = function theRemoveProjectFunction(projectName) {
    const idx = mod.projectList.indexOf(projectName);

    if (idx !== -1) {
      mod.projectList.splice(idx, 1);
    }
    localStorage.setItem('projectItems', JSON.stringify(mod.projectList));
  };

  mod.returnAllProjects = function theReturnAllProjectsFunction() {
    return mod.projectList;
  };

  return mod;
}());

export {
  ProjectModule as default,
};
