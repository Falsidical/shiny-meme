import { Project } from './project';

export class UI {
  constructor() {
    this.projectsContainer = document.querySelector('.projects');
    this.notesContainer = document.querySelector('.notes');
    this.newProjectBtn = document.querySelector('#new-project-btn');

    this.newProjectBtn.addEventListener('click', this.createProject);
  }

  renderProjects(projects) {
    projects.forEach((project) => {
      const projectItem = document.createElement('p');
      projectItem.innerText = project.title;
      projectItem.addEventListener('click', () => {
        this.renderNotes(project.notes);
      });
      this.projectsContainer.appendChild(projectItem);
    });
  }

  renderNotes(notes) {
    this.clearNotes();
    notes.forEach((note) => {
      const noteContainer = document.createElement('div');
      const noteTitle = document.createElement('h2');
      noteTitle.textContent = note.title;
      const noteContent = document.createElement('p');
      noteContent.textContent = note.content;
      noteContainer.appendChild(noteTitle);
      noteContainer.appendChild(noteContent);
      this.notesContainer.appendChild(noteContainer);
    });
  }

  clearNotes() {
    this.notesContainer.replaceChildren();
  }

  createProject() {
    const projectTitle = prompt('Project Name');
    const newProject = new Project(projectTitle);
  }
}
