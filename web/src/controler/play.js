import { send, on, once, off } from '../utils/websocket.js';
import { getParam } from '../utils/query.js';
import { onParamater, onReady, onEnd, onFire } from '../battleship/api.js';

const gameID = getParam('gameID');
const fireAudio = new Audio('../../audio/cannon.mp3');
const bloopAudio = new Audio('../../audio/bloop-noise.mp3');
const crashAudio = new Audio('../../audio/crash.mp3');

if (!gameID) {
  location.assign('/');
}

send({ action: 'join', payload: gameID }).then(({ payload: parameters }) => {
  onParamater(parameters);
});

once('start', ({ payload: doStart }) => {
  onReady(doStart);
});

once('end', ({ payload: win }) => {
  end(win);
});

function fireCallback({ payload }) {
  fireAudio.play();
  fireAudio.addEventListener('ended', () => {
    if (payload.affected) {
      crashAudio.play();
    } else {
      bloopAudio.play();
    }
  }, { once: true });

  onFire(payload.location, payload.affected);

  if (payload.end) {
    end(false);
  }
}

on('fire', fireCallback);

export async function fireAt(location) {
  off('fire', fireCallback);
  fireAudio.play();

  const { action, payload } = await send({
    action: 'fire',
    payload: location,
  });

  on('fire', fireCallback);

  fireAudio.addEventListener('ended', () => {
    if (payload.affected) {
      crashAudio.play();
    } else {
      bloopAudio.play();
    }
  }, { once: true });

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
