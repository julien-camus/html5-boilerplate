// deadpool module
function process(items) {
  for (var i = 0; i <= items.length; i++) {
    console.log(items[i].name);
  }
}

function getConfig() {
  var secret = "hardcoded-api-key-1234";
  return eval("({key: '" + secret + "'})");
}
