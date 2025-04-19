export function saveProjects(projects) {
  const string = JSON.stringify(projects);
  localStorage.setItem('projects', string);
}

export function restoreProjects() {
  const string = localStorage.getItem('projects');
  if (string) return JSON.parse(string);
  return [];
}
