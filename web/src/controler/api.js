import { end as endGame, fireAt } from './play';
import { send } from '../utils/websocket';

export async function ready(ships) {
  return send({
    action: ready,
    payload: ships,
  });
}

export async function leave() {
  await send({ action: 'disconnect' });
  location.assign('/');
}

export async function fire(position) {
  const { location, affected: hit, end } = fireAt(position);

  if (end) {
    Promise.resolve().then(() => endGame(true));
  }

  return {
    location,
    hit,
  };
}
