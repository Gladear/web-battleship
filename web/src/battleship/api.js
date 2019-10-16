export function onFire(pos){

    //Triggerd when recieving a fire from the server
    var newPos = {x:payload.x,y:payload.y};

    if(turn == playerNumber){
        //Player is the one who fired
        board.addPosEnemy(newPos);
        board.resetFireCase();
        if(true){
            board.addEnemyDamage(newPos);
        }
    } else {
        //Player is the one who got fired at
        board.addPosOwn(newPos);
        if(true){
            board.addOwnDamage(newPos);
        }
    }

    //Update the UI




}

export function onSwtichTurn(){
    turn = turn==1 ? 2 : 1;
    updateUIFire();
}

export function onMessageStart(){

    //Triggerd when both players are ready
    //The game can switch from placement to fire phase

    updateUI();

}

export function sendReady(){

}

export function sendFire(){

}
