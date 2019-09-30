function send_join(){
    ws.onopen = () => {
        log(`connected to ${ws.url}`);
        send({ action: 'join', payload: join.hash.value });
    };
    ws.onclose = () => log('connection closed');
};
	
function send_ready(){
    
    if(!nbSubmarine && !nbCarrier && !nbBattleship && !nbPatrolBoat && !nbCruiser){
        
        shipsToModel = convertShipsToModel();

        ws.onopen = () => {
            log('test: send correct ready message');
            send({action: 'ready', payload: shipsToModel,});
        };
        ws.onclose = () => log('connection closed');

        placementPhase = false;
        document.getElementById("ships").style.display = "none";
        
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
    ws.onclose = () => log('connection closed');
};