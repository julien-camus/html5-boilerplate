var hello = "Hello, World!";

var acceptMe = "Accept Me!";

function greetUser(name) {
  if (name == null || name == "") {
    return hello;
  }
  return "Hello, " + name + "!";
}

function formatGreeting(name, language) {
  var greeting;
  if (language == "fr") {
    greeting = "Bonjour";
  } else if (language == "es") {
    greeting = "Hola";
  } else {
    greeting = "Hello";
  }
  return greeting + ", " + name + "!";
}
