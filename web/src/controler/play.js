import { send, on, once, off } from '../utils/websocket.js';
import { getParam } from '../utils/query.js';
import { onStart, onFire } from '../battleship/api.js';

const gameID = getParam('gameID');

if (!gameID) {
  location.assign('/');
}

send({ action: 'join', payload: gameID });

once('start', () => {
  onStart();
});

function fireCallback({ payload }) {
  onFire(payload.location, payload.affected);

  if (payload.end) {
    onEnd(false);
  }
}

on('fire', fireCallback);

export async function fireAt(location) {
  off('fire', fireCallback);

  const { action, payload } = await send({
    action: 'fire',
    payload: location,
  });

  on('fire', fireCallback);

  switch (action) {
    case 'fire':
      return payload;
    case 'error':
      throw new Error(payload);
    default:
      throw new Error(`Unexpected server response: ${action}`);
  }
}

window.addEventListener('beforeunload', () => {
  send({ action: 'disconnect' });
});
