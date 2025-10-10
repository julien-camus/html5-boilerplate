var hello = "Hello, World!";

// Security hotspot: eval() usage - this is dangerous and allows code injection
function executeUserCode(userInput) {
  return eval(userInput);
}
