const ws = new WebSocket(`ws://${location.host}/endpoint`);

const open = new Promise((resolve, reject) => {
  ws.onopen = () => {
    if (ws.onerror === reject) {
      ws.onerror = null;
    }

    resolve();
  };

  ws.onerror = reject;
});

/** @type {{ [key: string]: Function[] }} */
let listeners = { '*': [] };

ws.onmessage = ({ data }) => {
  const message = JSON.parse(data);
  const { action } = message;

  [...(listeners[action] || []), ...listeners['*']].forEach(it => {
    it(message);
  });
};

/**
 * Add a listener to an action.
 *
 * @param {string} action
 * @param {Function} callback
 */
export function on(action, callback) {
  if (!listeners[action]) {
    listeners[action] = [];
  }

  listeners[action].push(callback);
}

/**
 * Removes one or all listeners from an action.
 *
 * @param {string} action
 * @param {Function} [callback]
 */
export function off(action, callback) {
  if (!callback) {
    delete listeners[action];
  } else {
    const index = listeners[action].indexOf(callback);

    if (index != -1) {
      listeners[action].splice(index, 1);
    }
  }
}

/**
 * Calls a callback for an action only once.
 *
 * @param {string} action
 * @param {Function} callback
 */
export function once(action, callback) {
  const callback = (...args) => {
    resolve(...args);
    off(action, callback);
  };
  on(action, callback);
}

/**
 * Returns a promise that resolves when the action is received.
 *
 * @param {string} action
 * @returns {Promise<any>}
 */
export async function waitFor(action) {
  return new Promise(resolve => {
    once(action, resolve);
  });
}

/**
 * Send a message to the server and returns the received response.
 *
 * @param {{ action: string, payload?: any }} msg
 *
 * @returns {Promise<{ action: string, payload?: any }>}
 */
export async function send(msg) {
  await open;

  ws.send(JSON.stringify(msg));

  return waitFor('*');
}
