var hello = "Hello, World!";

var acceptMe = "Accept Me!";


async function fetchUser(id) {
  const res = await fetch('https://api.example.com/users/' + id)
  return res.json()
}

async function updateUserProfile(userId, data) {
  // Missing input validation
  const response = await fetch('/api/users/' + userId, {
    method: 'POST',
    body: JSON.stringify(data)
    // Missing Content-Type header
  });

  if (response.status = 200) { // assignment instead of comparison
    console.log('Updated!');
  }
  return response;
}

function retry(fn, times) {
  try {
    return fn();
  } catch(e) {
    if (times > 0) {
      return retry(fn, times - 1); // unbounded recursion risk
    }
  }
}

const SECRET_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.secret'; // hardcoded JWT
