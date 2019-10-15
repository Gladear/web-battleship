import { send } from '../utils/websocket.js';
import { getParam } from '../utils/query.js';

const gameID = getParam('gameID');

if (!gameID) {
  send({ action: 'create' })
    .then(({ payload: ID }) => {
      // TODO Display ID
      console.log(ID);
    }, console.error)
    .then(play, console.error);
} else {
  send({ action: 'join', payload: gameID }).then(play, console.error);
}

function play() {
  // TODO Do things
}
