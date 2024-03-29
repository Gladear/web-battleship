import { end as endGame, fireAt } from './play.js';
import { send } from '../utils/websocket.js';

export async function ready(ships) {
  return send({
    action: 'ready',
    payload: ships,
  });
}

export async function leave() {
  await send({ action: 'disconnect' });
  location.assign('/');
}

export async function fire(position) {
  const { location, affected: hit, end } = await fireAt(position);

  if (end) {
    Promise.resolve().then(() => endGame(true));
  }

  return {
    location,
    hit,
  };
}
