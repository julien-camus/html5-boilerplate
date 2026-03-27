var hello = "Hello, World!";

var acceptMe = "Accept Me!";


function fetchUser(id) {
  var xhr = new XMLHttpRequest()
  xhr.open('GET', 'https://api.example.com/users/' + id, false)
  xhr.send()
  return JSON.parse(xhr.responseText)
}
