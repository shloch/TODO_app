'use strict';

var ProjectModule = (function() {
    let projectList = ['GENERAL', 'WORK', 'HOME'];


    let mod = {};
    mod.addProject = function(newProjectName) {
        projectList.push(newProjectName);
    }
    mod.removeProject = function(projectName) {
        let idx = projectList.indexOf(projectName)
        if (idx != -1) {
            projectList.splice(idx, 1);
        }
    };

    mod.returnAllProjects = function() {
        return projectList;
    };


    return mod;
})();

export { ProjectModule };