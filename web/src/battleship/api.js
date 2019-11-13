import {
    updateUIFire,
    initParamaters,
    board,
    updateUI,
    playerNumber,
    init,
    setPlayerNumber,
    isPlayerTurn,
    addEnemyFire,
    addOwnFire,
} from "./Game.js";
import { ready, fire, leave } from "../controler/api.js";

/********************************
* Send
********************************/

export function sendReady(ships){
    console.log("ready");

    //Send ready to the server with ships
    ready(ships);
}

export function sendLeave(){

    console.log("quit");

    //Triggerd when quitting the game
    leave();

    location.assign("/");
}

export async function sendFire(){
    //Triggerd when sending a fire to the server

    if(isPlayerTurn() && board.firePositionValid()){

        console.log("fire");

        var pos = {x:board.fireX,y:board.fireY};

        try {
            var resp = await fire(pos)
        } catch {
            return 0;
        }

        var txt = resp.hit ? "Hit !" : "Miss !";
        alert(txt);

        //Player is the one who fired
        addEnemyFire(pos,resp);
    }

}


/********************************
* Recieve
********************************/

export function onParamater(parameters){

    initParamaters(parameters);
    init();
}

export function onReady(playernb){
    //Triggerd when both players are ready
    //The game can switch from placement to fire phase

    setPlayerNumber(playernb == 1 ? 1 : 2);
    updateUI();

}

export function onQuit(){
    //Triggerd when the enemy quits the game

}

export function onFire(resp){
    //Triggerd when recieving a fire from the server
    //Player is the one who got fired at
    addOwnFire(resp)
}

export function onEnd(win){
    //Triggerd when winning the game

    var txt = win ? "You won !" : "You lost !";
    alert(txt);
}
