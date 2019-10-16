import { send } from '../utils/websocket.js'

send({ action: 'create' }).then(({ payload: gameID }) => {
  document.forms.menu.gameID.value = gameID;
}, console.error);
