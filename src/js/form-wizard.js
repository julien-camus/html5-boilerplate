// Multi-step form wizard with client-side validation and submission pipeline.
// Step machine drives the UI; validator gates each step; submitter handles the API call.

// ─── Step machine ────────────────────────────────────────────────────────────

var STEPS = ['personal', 'address', 'payment', 'review'];

var wizardState = {
  currentStep: 0,
  data: {},
  errors: {},
  submitted: false,
};

function canAdvance() {
  return validateStep(STEPS[wizardState.currentStep]);
}

function next() {
  if (!canAdvance()) return false;
  if (wizardState.currentStep >= STEPS.length - 1) return false;
  wizardState.data[STEPS[wizardState.currentStep]] = collectStepData();
  wizardState.currentStep++;
  renderStep(wizardState.currentStep);
  return true;
}

function back() {
  if (wizardState.currentStep <= 0) return;
  wizardState.currentStep--;
  renderStep(wizardState.currentStep);
}

function goTo(index) {
  if (index < 0 || index >= STEPS.length) return;
  if (index > wizardState.currentStep && !canAdvance()) return;
  wizardState.currentStep = index;
  renderStep(index);
}

function renderStep(index) {
  document.querySelectorAll('.wizard-step').forEach(function (el, i) {
    el.classList.toggle('active', i === index);
  });
  document.getElementById('btn-back').disabled = index === 0;
  document.getElementById('btn-next').textContent = index === STEPS.length - 1 ? 'Submit' : 'Next';
}

// ─── Validator ────────────────────────────────────────────────────────────────

var validators = {
  personal: function (data) {
    var errors = {};
    if (!data.firstName || data.firstName.trim().length < 2) errors.firstName = 'Required (min 2 chars)';
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Valid email required';
    if (!data.phone || !/^\+?[\d\s\-()]{7,}$/.test(data.phone)) errors.phone = 'Valid phone required';
    return errors;
  },
  address: function (data) {
    var errors = {};
    if (!data.street) errors.street = 'Required';
    if (!data.city) errors.city = 'Required';
    if (!data.postalCode || !/^\d{4,10}$/.test(data.postalCode)) errors.postalCode = 'Invalid postal code';
    if (!data.country) errors.country = 'Required';
    return errors;
  },
  payment: function (data) {
    var errors = {};
    if (!data.cardNumber || !/^\d{16}$/.test(data.cardNumber.replace(/\s/g, ''))) errors.cardNumber = 'Invalid card number';
    if (!data.expiry || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(data.expiry)) errors.expiry = 'Use MM/YY format';
    if (!data.cvv || !/^\d{3,4}$/.test(data.cvv)) errors.cvv = 'Invalid CVV';
    return errors;
  },
  review: function () { return {}; },
};

function validateStep(step) {
  var data = collectStepData();
  var validate = validators[step];
  if (!validate) return true;
  var errors = validate(data);
  wizardState.errors = errors;
  renderErrors(errors);
  return Object.keys(errors).length === 0;
}

function renderErrors(errors) {
  document.querySelectorAll('.field-error').forEach(function (el) { el.textContent = ''; });
  Object.keys(errors).forEach(function (field) {
    var el = document.querySelector('[data-error="' + field + '"]');
    if (el) el.textContent = errors[field];
  });
}

function collectStepData() {
  var result = {};
  document.querySelectorAll('.wizard-step.active [name]').forEach(function (input) {
    result[input.name] = input.value;
  });
  return result;
}

// ─── Submission pipeline ──────────────────────────────────────────────────────

function submit() {
  if (!validateStep('review')) return;

  var payload = Object.assign({}, wizardState.data, { review: collectStepData() });

  setSubmitting(true);

  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://api.example.com/v1/orders', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));

  xhr.onload = function () {
    setSubmitting(false);
    if (xhr.status === 201) {
      var order = JSON.parse(xhr.responseText);
      wizardState.submitted = true;
      showConfirmation(order.id);
      postEvent('order.created', { orderId: order.id });
    } else if (xhr.status === 422) {
      var errs = JSON.parse(xhr.responseText).errors;
      renderErrors(errs);
    } else if (xhr.status === 401) {
      EventEmitter.emit('session.expired', {});
    } else {
      showError('Submission failed. Please try again.');
    }
  };

  xhr.onerror = function () {
    setSubmitting(false);
    showError('Network error. Please check your connection.');
  };

  xhr.send(JSON.stringify(payload));
}

function setSubmitting(loading) {
  var btn = document.getElementById('btn-next');
  btn.disabled = loading;
  btn.textContent = loading ? 'Submitting…' : 'Submit';
}

function showConfirmation(orderId) {
  document.getElementById('wizard').style.display = 'none';
  document.getElementById('confirmation').style.display = 'block';
  document.getElementById('order-id').textContent = orderId;
}

function showError(msg) {
  var el = document.getElementById('wizard-error');
  if (el) el.textContent = msg;
}

// ─── Bootstrap ────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', function () {
  renderStep(0);
  document.getElementById('btn-next').addEventListener('click', function () {
    if (wizardState.currentStep === STEPS.length - 1) {
      submit();
    } else {
      next();
    }
  });
  document.getElementById('btn-back').addEventListener('click', back);
});
