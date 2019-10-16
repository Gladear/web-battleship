import { send } from '../utils/websocket.js';
import { getParam } from '../utils/query.js';

const gameID = getParam('gameID');

if (!gameID) {
  location.assign('/');
}

send({ action: 'join', payload: gameID }).then(play, console.error);

function play() {
  // TODO Do things
}
