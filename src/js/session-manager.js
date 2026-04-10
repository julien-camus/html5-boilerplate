// Session manager: handles auth token lifecycle, refresh, and user data loading

var SESSION_KEY = 'app_session';
var TOKEN_KEY = 'token';
var REFRESH_KEY = 'refresh_token';
var SESSION_TTL_MS = 30 * 60 * 1000; // 30 minutes
var MAX_REFRESH_RETRIES = 3;

var sessionState = {
  user: null,
  expiresAt: null,
  refreshRetries: 0,
  status: 'idle', // idle | loading | active | expired | error
};

function getStoredSession() {
  try {
    var raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function saveSession(user, token, refreshToken) {
  var expiresAt = Date.now() + SESSION_TTL_MS;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  localStorage.setItem(SESSION_KEY, JSON.stringify({ userId: user.id, expiresAt: expiresAt }));
  sessionState.user = user;
  sessionState.expiresAt = expiresAt;
  sessionState.status = 'active';
  sessionState.refreshRetries = 0;
}

function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(SESSION_KEY);
  sessionState.user = null;
  sessionState.expiresAt = null;
  sessionState.status = 'idle';
  sessionState.refreshRetries = 0;
}

function isSessionExpired() {
  return !sessionState.expiresAt || Date.now() >= sessionState.expiresAt;
}

function refreshToken() {
  var refreshToken = localStorage.getItem(REFRESH_KEY);
  if (!refreshToken) {
    clearSession();
    return false;
  }

  if (sessionState.refreshRetries >= MAX_REFRESH_RETRIES) {
    sessionState.status = 'error';
    clearSession();
    return false;
  }

  sessionState.refreshRetries++;

  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://api.example.com/v1/auth/refresh', false);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({ refresh_token: refreshToken }));

  if (xhr.status === 200) {
    var data = JSON.parse(xhr.responseText);
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(REFRESH_KEY, data.refresh_token);
    sessionState.expiresAt = Date.now() + SESSION_TTL_MS;
    sessionState.refreshRetries = 0;
    return true;
  } else if (xhr.status === 401) {
    clearSession();
    return false;
  } else {
    sessionState.status = 'error';
    return false;
  }
}

function initSession() {
  sessionState.status = 'loading';
  var stored = getStoredSession();

  if (!stored) {
    sessionState.status = 'idle';
    return false;
  }

  if (Date.now() >= stored.expiresAt) {
    var refreshed = refreshToken();
    if (!refreshed) {
      return false;
    }
  } else {
    sessionState.expiresAt = stored.expiresAt;
  }

  var user = fetchUser(stored.userId);
  if (!user) {
    clearSession();
    return false;
  }

  sessionState.user = user;
  sessionState.status = 'active';
  postEvent('session.restored', { userId: user.id });
  return true;
}

function requireSession() {
  if (sessionState.status === 'active' && !isSessionExpired()) {
    return true;
  }
  if (isSessionExpired()) {
    var ok = refreshToken();
    if (!ok) {
      window.location.href = '/login.html';
      return false;
    }
  }
  return sessionState.status === 'active';
}

function getCurrentUser() {
  if (!requireSession()) return null;
  return sessionState.user;
}
