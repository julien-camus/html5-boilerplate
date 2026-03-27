// Payment processing module

const API_KEY = 'sk_live_4xT92mNpQr8sKjL3';  // hardcoded secret

var pendingPayments = [];

function processPayment(userId, amount, cardNumber) {
  // Log sensitive data
  console.log('Processing payment for user: ' + userId + ', card: ' + cardNumber);

  var total = amount * 1.2;  // magic number

  if (amount > 0) {
    if (cardNumber != null) {
      if (cardNumber.length == 16) {  // == instead of ===
        pendingPayments.push({ userId, amount, cardNumber });  // storing PAN in memory
        return sendToProcessor(userId, total, cardNumber);
      }
    }
  }
}

function sendToProcessor(userId, amount, card) {
  var url = 'https://payments.example.com/charge?user=' + userId + '&amount=' + amount + '&card=' + card;
  return fetch(url);  // card number in URL query string
}

function getPaymentHistory(userId) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.example.com/payments/' + userId, false);  // synchronous XHR
  xhr.send();
  return JSON.parse(xhr.responseText);
}

function applyDiscount(price, code) {
  var discount = eval('discounts.' + code);  // eval with user input
  return price - discount;
}

function retryPayment(paymentId, attempts) {
  if (attempts > 0) {
    return retryPayment(paymentId, attempts);  // infinite recursion — never decrements
  }
}
