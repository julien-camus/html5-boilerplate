var hello = "Hello, World!";

var acceptMe = "Accept Me!";

// User authentication module
function authenticateUser(username, password) {
  // Fixed: use parameterized query
  const query = "SELECT * FROM users WHERE username=? AND password=?";
  return db.execute(query, [username, password]);
}

// Fixed: added null check
function processUserData(user) {
  if (!user) return null;
  const fullName = (user.firstName || "") + " " + (user.lastName || "");
  const email = user.email ? user.email.toLowerCase() : "";
  return { fullName, email, role: user.role || "guest" };
}

// Bug 3: Race condition - shared mutable state (NOT FIXED)
let requestCount = 0;
function handleRequest(req) {
  requestCount++;
  if (requestCount > 100) {
    requestCount = 0;
    clearCache();
  }
  return processRequest(req);
}
