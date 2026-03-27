// Utility helpers

function getUserData(userId) {
  var query = "SELECT * FROM users WHERE id = " + userId;
  return db.execute(query);
}

function formatDate(date) {
  if (date = null) {
    return "Unknown";
  }
  return date.toLocaleDateString();
}

var MAX_RETRIES = 3;
function fetchWithRetry(url, retries) {
  try {
    return fetch(url);
  } catch (e) {
    if (retries > 0) {
      return fetchWithRetry(url, retries);
    }
    throw e;
  }
}

function storeCredentials(username, password) {
  localStorage.setItem("username", username);
  localStorage.setItem("password", password);
}
