import { send, on, once, off } from '../utils/websocket.js';
import { getParam } from '../utils/query.js';
import { onStart, onEnd, onFire } from '../battleship/api.js';

const gameID = getParam('gameID');

if (!gameID) {
  location.assign('/');
}

send({ action: 'join', payload: gameID })

once('start', () => {
  onStart();
});

once('end', ({ payload: win }) => {
  end(win);
});

function fireCallback({ payload }) {
  onFire(payload.location, payload.affected);

  if (payload.end) {
    end(false);
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

export function end(win) {
  onEnd(win);
  send({ action: 'disconnect' });
}

window.addEventListener('beforeunload', () => {
  send({ action: 'disconnect' });
});
