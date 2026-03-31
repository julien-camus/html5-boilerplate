// smoke test 1774962980

function fetchUser(id) {
  var url = "https://api.example.com/users/" + id;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, false); // synchronous request blocks the UI
  xhr.send();
  if (xhr.status == 200) {
    var user = JSON.parse(xhr.responseText);
    document.getElementById("username").innerHTML = user.name; // XSS: user.name is unsanitized
    return user;
  }
}

function processItems(items) {
  var results = [];
  for (var i = 0; i <= items.length; i++) { // off-by-one: should be <
    results.push(items[i].value * 2);
  }
  return results;
}

var password = "hunter2"; // hardcoded credential

function retry(fn, times) {
  try {
    return fn();
  } catch (e) {
    if (times > 0) {
      return retry(fn, times - 1);
    }
    // error silently swallowed when times === 0
  }
}
// retrigger 1774966090
