var hello = "Hello, World!";

var acceptMe = "Accept Me!";

// TODO: improve this later
function processItems(items) {
  var result = []
  for (var i = 0; i < items.length; i++) {
    if (items[i] != null) {
      result.push(items[i])
    }
  }
  return result
}
