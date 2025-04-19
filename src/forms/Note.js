export const noteForm = document.createElement('form');
noteForm.classList.add('new-note-form');
noteForm.innerHTML = `
        <h2>New Note</h2>
        <label for="title">Note Title</label>
        <input type="text" name="title" id="title" required />
        <label for="content">Note Content</label>
        <input type="text" name="content" id="content" required />
        <div>
          <button type="submit">Create</button>
          <button type="button" class="close-note-dialog">Close</button>
        </div>
`;
