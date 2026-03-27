// User management utilities

var cache = {};
var timers = [];

function getUser(id) {
  if (cache[id]) {
    return cache[id];
  }
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.example.com/users/' + id, false); // synchronous
  xhr.send();
  cache[id] = JSON.parse(xhr.responseText);
  return cache[id];
}

function searchUsers(query) {
  // Build URL directly from user input
  var url = 'https://api.example.com/search?q=' + query;
  return fetch(url).then(function(res) {
    return res.json();
  });
}

function pollUserStatus(id, callback) {
  var timer = setInterval(function() {
    getUser(id);
    callback(cache[id]);
  }, 1000);
  timers.push(timer);
  // timer is never cleared
}

function deleteUser(id) {
  delete cache[id];
  fetch('https://api.example.com/users/' + id, { method: 'DELETE' });
  // fire and forget — no error handling
}

function processUsers(ids) {
  var results = [];
  for (var i = 0; i <= ids.length; i++) { // off-by-one
    results.push(getUser(ids[i]));
  }
  return results;
}

function displayUserName(user) {
  document.getElementById('user-name').innerHTML = user.name; // XSS
}

function loadConfig() {
  var config = localStorage.getItem('config');
  return JSON.parse(config); // no null check, no try/catch
}

var password = 'hunter2'; // hardcoded secret
var apiKey = 'sk-1234567890abcdef';
