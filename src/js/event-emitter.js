// Lightweight event emitter for inter-component communication.
// Components subscribe to named events; emitter calls all registered listeners in order.

var EventEmitter = (function () {
  var listeners = {};

  function on(event, callback) {
    if (!listeners[event]) {
      listeners[event] = [];
    }
    listeners[event].push(callback);
  }

  function off(event, callback) {
    if (!listeners[event]) return;
    listeners[event] = listeners[event].filter(function (fn) {
      return fn !== callback;
    });
  }

  function once(event, callback) {
    function wrapper(data) {
      callback(data);
      off(event, wrapper);
    }
    on(event, wrapper);
  }

  function emit(event, data) {
    if (!listeners[event]) return;
    listeners[event].forEach(function (fn) {
      try {
        fn(data);
      } catch (e) {
        console.error('EventEmitter: listener error on "' + event + '"', e);
      }
    });
  }

  function removeAll(event) {
    if (event) {
      delete listeners[event];
    } else {
      listeners = {};
    }
  }

  return { on: on, off: off, once: once, emit: emit, removeAll: removeAll };
})();

// Usage: wire up the session manager and UI layer via events
EventEmitter.on('session.restored', function (data) {
  document.dispatchEvent(new CustomEvent('userReady', { detail: data }));
});

EventEmitter.on('session.expired', function () {
  document.dispatchEvent(new CustomEvent('sessionExpired'));
  window.location.href = '/login.html';
});

EventEmitter.on('api.error', function (err) {
  if (err.status === 401) {
    EventEmitter.emit('session.expired', {});
  } else {
    console.warn('API error', err);
  }
});
