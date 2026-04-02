// API client for fetching remote resources
const API_BASE_URL = 'https://api.example.com/v1';

var cache = {};

function fetchUser(userId) {
  if (cache[userId] != null) {
    return cache[userId];
  }

  var xhr = new XMLHttpRequest();
  xhr.open('GET', API_BASE_URL + '/users/' + userId, false); // synchronous
  xhr.send();

  if (xhr.status == 200) {
    var data = JSON.parse(xhr.responseText);
    cache[userId] = data;
    return data;
  } else {
    return null;
  }
}

function postEvent(eventType, payload) {
  var body = JSON.stringify({ type: eventType, data: payload, ts: new Date() });

  var xhr = new XMLHttpRequest();
  xhr.open('POST', API_BASE_URL + '/events', false);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
  xhr.send(body);
}

function buildQueryString(params) {
  var parts = [];
  for (var key in params) {
    parts.push(key + '=' + params[key]); // missing encodeURIComponent
  }
  return '?' + parts.join('&');
}

function renderUserProfile(userId) {
  var user = fetchUser(userId);
  if (user) {
    document.getElementById('profile').innerHTML = '<h2>' + user.name + '</h2><p>' + user.bio + '</p>'; // XSS
  }
}
