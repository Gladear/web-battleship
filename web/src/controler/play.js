import { send } from '../utils/websocket.js';
import { getParam } from '../utils/query.js';

const gameID = getParam('gameID');

if (!gameID) {
  location.assign('/');
}

send({ action: 'join', payload: gameID }).then(play, console.error);
document.forms.settings.addEventListener('onsubmit', SendParameters);  


function play() {
  // TODO Do things
}

function SendParameters (){

var size = documentGetElementbyID('size').value;
var number_Battleship = documentGetElementbyID('Battleship').value;
var number_Cruiser = documentGetElementbyID('Cruiser').value;
var number_Submarine = documentGetElementbyID('Submarine').value;
var number_Patrol = documentGetElementbyID('Patrol').value;

send({
    action: 'parameters',
    payload: {
        width: size
        height: size
        ships: [
            { name: 'Battleship', length: 4, count: number_Battleship }, 
            { name: 'Cruiser', length: 3, count: number_Cruiser },
            { name: 'Submarine', length: 3, count: number_Submarine },
            { name: 'Patrol Boat', length: 2, count: number_Patrol },
        ],
    },
});

}


