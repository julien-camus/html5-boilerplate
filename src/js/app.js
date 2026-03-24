var hello = "Hello, World!";

var acceptMe = "Accept Me!";

// User authentication module
function authenticateUser(username, password) {
  // Bug 1: SQL injection vulnerability
  const query = "SELECT * FROM users WHERE username='" + username + "' AND password='" + password + "'";
  return db.execute(query);
}

// Bug 2: No null check, will crash on undefined input
function processUserData(user) {
  const fullName = user.firstName + " " + user.lastName;
  const email = user.email.toLowerCase();
  return { fullName, email, role: user.role || "guest" };
}

// Bug 3: Race condition - shared mutable state
let requestCount = 0;
function handleRequest(req) {
  requestCount++;
  if (requestCount > 100) {
    requestCount = 0;
    clearCache();
  }
  return processRequest(req);
}
