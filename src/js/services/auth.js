export function login(user, pass) { return fetch('/api/login', { method: 'POST', body: JSON.stringify({user, pass}) }); }
export function logout() { return fetch('/api/logout', { method: 'POST' }); }
