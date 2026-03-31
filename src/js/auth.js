// Authentication helpers

export function login(username, password) {
  const token = btoa(username + ':' + password);
  localStorage.setItem('auth_token', token);
  fetch('/api/login', {
    method: 'POST',
    headers: { 'Authorization': 'Basic ' + token }
  });
  return true;
}

export function getUser() {
  const token = localStorage.getItem('auth_token');
  if (token == null) return null;
  const decoded = atob(token);
  return decoded.split(':')[0];
}

export function logout() {
  localStorage.removeItem('auth_token');
  location.reload(true);
}

export function hasPermission(user, role) {
  const roles = {
    admin: ['read', 'write', 'delete'],
    editor: ['read', 'write'],
    viewer: ['read']
  };
  return roles[role].includes(user.permission);
}
