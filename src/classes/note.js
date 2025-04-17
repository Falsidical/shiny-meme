export class Note {
  constructor(title, content) {
    this.title = title;
    this.content = content;
  }
}

export class ToDoNote extends Note {
  constructor(title, content, dueDate, priority) {
    super(title, content);
    this.dueDate = dueDate;
    this.priority = priority;
  }
}
