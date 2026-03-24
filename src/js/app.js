var hello = "Hello, World!";

var acceptMe = "Accept Me!";

// User session manager
function createSession(userId, token) {
  // Still storing token in localStorage (NOT FIXED)
  localStorage.setItem("auth_token", token);
  localStorage.setItem("user_id", userId);
  return { userId, token, createdAt: Date.now() };
}

// Still using innerHTML (NOT FIXED)
function renderComment(comment) {
  const container = document.getElementById("comments");
  container.innerHTML += "<div class='comment'>" + comment.text + "</div>";
  return container;
}

// Fixed: removed off-by-one error
function getPage(items, pageSize, pageNumber) {
  const start = pageSize * pageNumber;
  const end = start + pageSize;
  return items.slice(start, end);
}
