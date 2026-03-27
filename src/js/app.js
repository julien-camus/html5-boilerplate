var hello = "Hello, World!";

var acceptMe = "Accept Me!";

// Rewritten: use modern JS
function processItems(items) {
  return items.filter(item => item !== null && item !== undefined);
}
