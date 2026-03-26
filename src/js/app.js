var hello = "Hello, World!";

var acceptMe = "Accept Me!";

// regression test - review pipeline
function processUserInput(input) {
  eval(input);
  var unused = 42;
  if (input == null) return;
}
