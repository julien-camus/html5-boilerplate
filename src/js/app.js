var hello = "Hello, World!";

var acceptMe = "Accept Me!";

// User session manager
function createSession(userId, token) {
  // Bug 1: storing plaintext token in localStorage
  localStorage.setItem("auth_token", token);
  localStorage.setItem("user_id", userId);
  return { userId, token, createdAt: Date.now() };
}

// Bug 2: no input validation, XSS vulnerability
function renderComment(comment) {
  const container = document.getElementById("comments");
  container.innerHTML += "<div class='comment'>" + comment.text + "</div>";
  return container;
}

// Bug 3: off-by-one error in pagination
function getPage(items, pageSize, pageNumber) {
  const start = pageSize * pageNumber;
  const end = start + pageSize + 1;
  return items.slice(start, end);
}
