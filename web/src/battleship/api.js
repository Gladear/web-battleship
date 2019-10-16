function onParamater(parameters){  
    initParamaters(parameters);  
}

function sendReady(){
    if(gameReady()) ready(ships);
}

function onReady(){
    //Triggerd when both players are ready
    //The game can switch from placement to fire phase

    updateUI();

}

function sendQuit(){
    //Triggerd when quitting the game
    
}

function onQuit(){
    //Triggerd when the enemy quits the game
    
}

function async sendFire(){
    //Triggerd when sending a fire to the server
    
    if(isPlayerTurn() && board.firePositionValid()){
        
        var pos = {x:board.fireX,y:board.fireY};
        
        try {
            var hit = await fire(pos)
        } catch {
            return 0;
        }

        //Player is the one who fired
        board.addPosEnemy(pos);
        board.resetFireCase();
        if(hit){
            board.addEnemyDamage(pos);
        }

        updateUIFire();
    }    
        
}

function onFire(pos,hit){
    //Triggerd when recieving a fire from the server
    //Player is the one who got fired at
    board.addPosOwn(pos);
    
    if(hit){
        board.addOwnDamage(pos);
    }
 
    updateUIFire();
}

function onEnd(win){
    //Triggerd when winning the game

}