export class Project {
  constructor(title) {
    this.title = title;
    this._notes = [];
  }

  addNote(note) {
    this.notes.push(note);
  }

  removeNote(noteIndex) {
    this.notes.splice(noteIndex, 1);
  }

  get notes() {
    return this._notes;
  }

  set notes(notes) {
    this._notes = notes;
  }
}
