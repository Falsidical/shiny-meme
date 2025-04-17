export function createElement(tag, textContent = '', className = '') {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (textContent) element.textContent = textContent;
  return element;
}

export function createForm(fields) {
  const formElement = document.createElement('form');
  fields.forEach((field) => {
    const label = document.createElement('label');
    label.textContent = field;
    label.setAttribute('for', field);

    const input = document.createElement('input');
    input.type = 'text';
    input.name = field;
    input.id = field;
    input.required = true;

    formElement.appendChild(label);
    formElement.appendChild(input);
  });
  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.textContent = 'Enviar';
  formElement.appendChild(submitBtn);
  return formElement;
}
