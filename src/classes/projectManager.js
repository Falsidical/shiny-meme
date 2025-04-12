import { Project } from './project';

class ProjectManager {
  constructor() {
    this.projects = [];
  }

  addProject(project) {
    this.projects.push(project);
  }
}

export const projectManager = new ProjectManager();

projectManager.addProject(new Project('Default'));
projectManager.addProject(new Project('Project One'));
