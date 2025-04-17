import { projectManager } from './projectManager';
import { Note } from './note';

export class UI {
  constructor() {
    this.activeProjectIndex = 0;
    this.projectsContainer = document.querySelector('.projects');
    this.notesContainer = document.querySelector('.notes');
    this.newProjectBtn = document.querySelector('#new-project-btn');
    this.newNoteBtn = document.querySelector('#new-note-btn');
    this.noteDialog = document.querySelector('.new-note-dialog');
    this.newNoteForm = document.querySelector('.new-note-form');
    this.claseNoteDialog = document.querySelector('.close-note-dialog');

    this.newProjectBtn.addEventListener('click', () => {
      this.createProject();
      this.renderProjects();
    });

    this.newNoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(this.newNoteForm);
      const title = formData.get('title');
      const content = formData.get('content');
      const newNote = new Note(title, content);
      projectManager.projects[this.activeProjectIndex].addNote(newNote);
      this.noteDialog.close();
      this.renderNotes();
    });

    this.newNoteBtn.addEventListener('click', () => {
      this.noteDialog.show();
    });

    this.claseNoteDialog.addEventListener('click', () => {
      this.noteDialog.close();
    });
  }

  renderProjects() {
    this.clearProjects();
    projectManager.projects.forEach((project, index) => {
      const projectItem = document.createElement('button');
      projectItem.innerText = project.title;
      projectItem.addEventListener('click', () => {
        this.activeProjectIndex = index;
        document.querySelector('.active')?.classList.remove('active');
        projectItem.classList.add('active');
        this.renderNotes();
      });
      this.projectsContainer.appendChild(projectItem);
    });
  }

  renderNotes() {
    this.clearNotes();
    projectManager.projects[this.activeProjectIndex].notes.forEach((note) => {
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

  createNoteElement(note) {
    const noteContainer = document.createElement('div');
    const noteTitle = document.createElement('h2');
    noteTitle.textContent = note.title;
    const noteContent = document.createElement('p');
    noteContent.textContent = note.content;
    noteContainer.appendChild(noteTitle);
    noteContainer.appendChild(noteContent);

    // Add a delete button for the note
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      projectManager.projects[this.activeProjectIndex].removeNote(note);
      this.renderNotes();
    });
    noteContainer.appendChild(deleteButton);

    return noteContainer;
  }

  clearNotes() {
    this.notesContainer.replaceChildren();
  }

  clearProjects() {
    this.projectsContainer.replaceChildren();
  }

  createProject() {
    const projectTitle = prompt('Project Name');
    projectManager.createProject(projectTitle);
  }
}
