import {
    updateUIFire,
    initParamaters,
    board,
    updateUI,
} from "./Game.js";

/********************************
* Send
********************************/

export function sendReady(ships){
    
    console.log(ships);
    
    //Send ready to the server with ships
    
    
}

export function sendQuit(){
    //Triggerd when quitting the game
    
}

export async function sendFire(){
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


/********************************
* Recieve
********************************/

export function onParamater(parameters){  
    initParamaters(parameters);  
}

export function onReady(){
    //Triggerd when both players are ready
    //The game can switch from placement to fire phase

    updateUI();

}

export function onQuit(){
    //Triggerd when the enemy quits the game
    
}

export function onFire(pos,hit){
    //Triggerd when recieving a fire from the server
    //Player is the one who got fired at
    board.addPosOwn(pos);
    
    if(hit){
        board.addOwnDamage(pos);
    }
 
    updateUIFire();
}

export function onEnd(win){
    //Triggerd when winning the game

}