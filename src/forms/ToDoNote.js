import { projectManager } from '../index.js';
import { ToDoNote } from '../classes/note';

export const toDoNoteForm = document.createElement('form');
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
        <div>
          <button type="submit">Create</button>
          <button type="button" class="close-note-dialog">Close</button>
        </div>
`;
toDoNoteForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = toDoNoteForm.elements.title.value;
  const content = toDoNoteForm.elements.content.value;
  const dueDate = new Date(toDoNoteForm.elements.dueDate.value);
  const priority = toDoNoteForm.elements.priority.value;
  const note = new ToDoNote(title, content, dueDate, priority);
  console.table(note);
  console.log(dueDate.toLocaleDateString());
  //projectManager.projects[this.activeProjectIndex].addNote(note);
  //this.dialog.close();
});
// forms/ToDoNote.js
