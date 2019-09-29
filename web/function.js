const ws = new WebSocket(`ws://${location.host}/endpoint`);
const join = document.forms.join;

const ships = [
        {
          position: {
            x: 'b',
            y: 2,
            orientation: 'H',
          },
          type: 'Carrier',
        },
        {
          position: {
            x: 'a',
            y: 3,
            orientation: 'V',
          },
          type: 'Battleship',
        },
        {
          position: {
            x: 'c',
            y: 3,
            orientation: 'H',
          },
          type: 'Cruiser',
        },
        {
          position: {
            x: 'd',
            y: 4,
            orientation: 'H',
          },
          type: 'Submarine',
        },
        {
          position: {
            x: 'e',
            y: 5,
            orientation: 'H',
          },
          type: 'Patrol Boat',
        },
      ];
	  
function send_join(){
		ws.onopen = () => {
			log(`connected to ${ws.url}`);
			send({ action: 'join', payload: join.hash.value });
		};
		ws.onclose = () => log('connection closed');
};
	
function send_ready(){
		ws.onopen = () => {
			log('test: send correct ready message');
            send({action: 'ready', payload: ships,});
		ws.onclose = () => log('connection closed');
};

function send_create(){
		ws.onopen = () => {
			log(`connected to ${ws.url}`);
			send({ action: 'create' });
		};
		ws.onclose = () => log('connection closed');
};