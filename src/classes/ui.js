import { projectManager } from './projectManager';
import { saveProjects } from '../dataController';
import { ToDoNote } from './note';

export class UI {
  constructor() {
    this.activeProjectIndex = 0;
    this.projectsContainer = document.querySelector('.projects');
    this.notesContainer = document.querySelector('.notes');
    this.newProjectBtn = document.querySelector('#new-project-btn');
    this.newNoteBtn = document.querySelector('#new-note-btn');
    this.dialog = document.querySelector('dialog');

    this.newProjectBtn.addEventListener('click', () => {
      this.createProject();
      this.renderProjects();
    });

    this.newNoteBtn.addEventListener('click', () => {
      this.clearDialog();
      this.createToDoNoteForm();

      this.dialog.show();
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
      noteContainer.appendChild(noteTitle);

      if (note.dueDate) {
        const dueDate = document.createElement('p');
        dueDate.innerText = `Due Date: ${note.dueDate.toLocaleString()}`;
        noteContainer.appendChild(dueDate);
      }

      const noteContent = document.createElement('p');
      noteContent.textContent = note.content;

      if (note.isDone !== undefined) {
        const doneLabel = document.createElement('label');
        doneLabel.innerText = 'isDone';
        doneLabel.setAttribute('for', 'isDone');
        noteContainer.appendChild(doneLabel);

        const toggleIsDone = document.createElement('input');
        toggleIsDone.setAttribute('name', 'isDone');
        toggleIsDone.setAttribute('type', 'checkbox');
        note.isDone && toggleIsDone.setAttribute('checked', 'true');
        toggleIsDone.addEventListener('click', () => {
          note.toggleIsDone();
          this.renderNotes();
        });

        noteContainer.appendChild(toggleIsDone);

        if (note.isDone) noteContent.classList.add('done');
      }

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

  clearDialog() {
    this.dialog.innerHTML = '';
  }

  createProject() {
    const projectTitle = prompt('Project Name');
    projectManager.createProject(projectTitle);
    saveProjects(projectManager.projects);
  }

  createToDoNoteForm() {
    const toDoNoteForm = document.createElement('form');
    toDoNoteForm.classList.add('new-note-form');
    toDoNoteForm.innerHTML = `
            <h2>New Note</h2>
            <label for="title">Note Title</label>
            <input type="text" name="title" id="title" required />
            <label for="content">Note Content</label>
            <input type="text" name="content" id="content" required />
            <label for="dueDate">Due Date</label>
            <input type="date" name="dueDate" id="dueDate" required />
            <label for="priority">Select Priority</label>
            <select name="priority" id="priority">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <div class='buttons'>
              <button type="submit">Create</button>
              <button type="button" class="close-note-dialog">Close</button>
            </div>
    `;
    this.dialog.appendChild(toDoNoteForm);

    document.querySelector('.close-note-dialog').addEventListener('click', () => {
      this.dialog.close();
    });

    toDoNoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = toDoNoteForm.elements.title.value;
      const content = toDoNoteForm.elements.content.value;
      const dueDate = new Date(toDoNoteForm.elements.dueDate.value);
      const priority = toDoNoteForm.elements.priority.value;
      const note = new ToDoNote(title, content, dueDate, priority);
      projectManager.projects[this.activeProjectIndex].addNote(note);
      this.renderNotes();
      this.dialog.close();
      saveProjects(projectManager.projects);
    });
  }
}
