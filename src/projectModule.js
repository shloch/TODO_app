'use strict';

var ProjectModule = (function() {
    let moduleList = ['GENERAL', 'WORK', 'HOME'];


    let mod = {};
    mod.addProject = function(newProjectName) {
        moduleList.push(newProjectName);
    }
    mod.removeProject = function(projectName) {
        let idx = moduleList.indexOf(projectName)
        if (idx != -1) {
            moduleList.splice(idx, 1);
        }
    };

    mod.returnAllModules = function() {
        return moduleList;
    };


    return mod;
})();

export { ProjectModule };