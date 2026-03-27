var hello = "Hello, World!";

var acceptMe = "Accept Me!";


async function fetchUser(id) {
  const res = await fetch('https://api.example.com/users/' + id)
  return res.json()
}
