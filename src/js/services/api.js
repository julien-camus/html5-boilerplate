export function getUser(id) { return fetch('/api/users/' + id); }
export function updateUser(id, data) { return fetch('/api/users/' + id, { method: 'PUT', body: JSON.stringify(data) }); }
