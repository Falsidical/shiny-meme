import { Project } from './project.js';
import { Note } from './note.js';

class ProjectManager {
  constructor() {
    this.projects = [];
  }

  addProject(project) {
    this.projects.push(project);
  }

  createProject(title) {
    this.addProject(new Project(title));
  }
}

export const projectManager = new ProjectManager();

projectManager.addProject(new Project('Default'));
projectManager.addProject(new Project('Project One'));

projectManager.projects[0].addNote(new Note('Nota 1', 'Nota de prueba'));
projectManager.projects[0].addNote(new Note('Nota 2', 'Otra Nota de prueba'));
projectManager.projects[1].addNote(new Note('Nota 3', 'Nota en otro projecto'));
