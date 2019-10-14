function send_join(hash){
    ws.onopen = () => {
        console.log('connected to ${ws.url}');
        send({ action: 'join', payload: hash});
    };
    
    ws.onmessage = event => {
        const { data } = event;
        const message = JSON.parse(data);
        console.log('received message: ', message);
    };
    
    ws.onclose = () => console.log('connection closed');
};
	
function send_ready(){
    
    if(gameReady()){
        
        shipsToModel = convertShipsToModel();

        ws.onopen = () => {
            console.log('test: send correct ready message');
            send({action: 'ready', payload: shipsToModel});
        };
        
        ws.onmessage = event => {
            const { data } = event;
            const message = JSON.parse(data);
            console.log('received message: ', message);
        };
        
        ws.onclose = () => console.log('connection closed');

        updateUI();
        
    }
};

function numToLetter(x){
    
    return String.fromCharCode(96+x);
    
}

function letterToNum(x){
    
    return x.charCodeAt(0) - 96;
    
}

function convertShipsToModel(){
    
    var player = board.players[playerNumber-1];
    
    shipsToModel = [];
    
    player.ships.forEach( function(ship){
        var type;
        
        switch(ship.type){
            case 0:
                type = 'Submarine';
                break;
            case 1:
                type = 'Carrier';
                break;
            case 2:
                type = 'Battleship';
                break;
            case 3:
                type = 'Patrol Boat';
                break;
            case 4:
                type = 'Cruiser';
                break;
        }
        
        var position = {
            x: numToLetter(ship.x),
            y: ship.y,
            orientation: ship.rotation ? 'V' : 'H'
        }
        
        var s = {
            position: position,
            type: type
        }
        
        shipsToModel.push(s);
    });
    
    return shipsToModel;
}

function send_create(){ 
    
    ws.onopen = () => {
        log(`connected to ${ws.url}`);
        send({ action: 'create' });
    };
    
    ws.onmessage = event => {
        const { data } = event;
        const message = JSON.parse(data);
        console.log('received message: ', message);
    };
    
    ws.onclose = () => log('connection closed');
    
};