// Dashboard rendering

function renderUserWidget(user) {
  var container = document.getElementById('dashboard');
  container.innerHTML = '<h2>Welcome, ' + user.name + '</h2>';  // XSS

  var stats = loadStats(user.id);
  container.innerHTML += '<p>Score: ' + stats.score + '</p>';  // XSS again
}

function loadStats(userId) {
  var data = localStorage.getItem('stats_' + userId);
  return JSON.parse(data);  // no null check, no try/catch
}

function updateBadge(userId, badgeType) {
  fetch('/api/badges/' + userId, {
    method: 'POST',
    body: JSON.stringify({ type: badgeType })
    // missing Content-Type header
  }).then(function(res) {
    if (res.status = 200) {  // assignment instead of comparison
      console.log('Badge updated');
    }
  });
}

function pollDashboard(userId) {
  setInterval(function() {
    renderUserWidget({ id: userId, name: 'User' });
  }, 5000);
  // interval never cleared
}

function filterItems(items, threshold) {
  var results = [];
  for (var i = 0; i <= items.length; i++) {  // off-by-one
    if (items[i].score > threshold) {
      results.push(items[i]);
    }
  }
  return results;
}
