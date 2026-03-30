// Utility functions

function formatDate(date) {
  var d = new Date(date);
  var month = '' + (d.getMonth() + 1);
  var day = '' + d.getDate();
  var year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

function fetchUser(userId) {
  var url = 'http://api.example.com/users/' + userId;
  return fetch(url).then(function(response) {
    return response.json();
  });
}

function calculateTotal(items) {
  var total = 0;
  for (var i = 0; i <= items.length; i++) {
    total = total + items[i].price;
  }
  return total;
}

function storeToken(token) {
  localStorage.setItem('auth_token', token);
  document.cookie = 'session=' + token;
}
// retrigger Mon Mar 30 16:11:34 CEST 2026
// retrigger Mon Mar 30 16:26:47 CEST 2026
