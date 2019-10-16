import { send } from '../utils/websocket.js';

send({ action: 'create' }).then(({ payload: gameID }) => {
  document.forms.menu.gameID.value = gameID;
}, console.error);

document.forms.settings.addEventListener('submit', sendParameters);

const sizeInd = document.getElementById('size-ind');
document.getElementById('size').addEventListener('input', event => {
  sizeInd.textContent = event.target.value;
});

function sendParameters(event) {
  event.preventDefault();

  var size = parseInt(document.getElementById('size').value, 10);
  var number_Carrier = parseInt(document.getElementById('carrier').value, 10);
  var number_Battleship = parseInt(document.getElementById('battleship').value, 10);
  var number_Cruiser = parseInt(document.getElementById('cruiser').value, 10);
  var number_Submarine = parseInt(document.getElementById('submarine').value, 10);
  var number_Patrol = parseInt(document.getElementById('patrol').value, 10);

  send({
    action: 'parameters',
    payload: {
      width: size,
      height: size,
      ships: [
        { name: 'Carrier', length: 5, count: number_Carrier },
        { name: 'Battleship', length: 4, count: number_Battleship },
        { name: 'Cruiser', length: 3, count: number_Cruiser },
        { name: 'Submarine', length: 3, count: number_Submarine },
        { name: 'Patrol Boat', length: 2, count: number_Patrol },
      ],
    },
  });
}
