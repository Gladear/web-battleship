import {AdvancedCtx} from "./AdvancedCtx.js";
import {Board} from "./Board.js";
import {DamageNotGame} from "./DamageNotGame.js";
import {Grid} from "./Grid.js";
import {Player} from "./Player.js";
import {Ship} from "./Ship.js";
import {ShipNotGame, setShipColors} from "./ShipNotGame.js";

import {
    sendReady,
    sendLeave,
    sendFire,
} from "./api.js";

var canvas = document.getElementById("battleship_board");
var context = canvas.getContext("2d");
canvas.style.cursor = "crosshair";

var frameRate = 100;
var clockRate = 50;
var d = new Date();
var time = d.getMilliseconds();
var newTime;
export var t = 0;
export var turn = 1;

export var Sh_ips;
export var Damage;

var hitOwn = false;

export var windowsLength = canvas.width;
export var windowsHeight = canvas.height;
var canvasBound = canvas.getBoundingClientRect();
var windowsOffsetLen = canvasBound.left + window.scrollX;
var windowsOffsetHei = canvasBound.top + window.scrollY;

export var gameLineNumber;
export var gameColNumber;

export var gridCaseLength;
export var gridCaseHeight;

export var gameBoardLength;
export var gameBoardHeight;

document.getElementById("battleship_board").onmousemove = cursor;
document.getElementById("battleship_board").onclick = cursorClick;

document.getElementById("button_ready").onclick = readyClick;
document.getElementById("button_left").onclick = sendLeave;

export var oceanWaveColor = "#5489d1";
export var oceanColor = "#2f70c7";
export var oceanColor2 = "#0a1727";
export var gridColor = "#000000";
export var boardColor = "#dd3030";
export var messageColor = "#e8a73f";
var gridTxtLength = 30;

export var displayOwnView = true;
var boatDefinition;

export var advCtx;
var grid;
export var board;

export var placementPhase = true;

export var playerNumber;

export function setPlayerNumber(pn) {
  playerNumber = pn;
}

export var turnAction = {
    life: 0,
    message: ""
};

var windowXInit;
var windowYInit;

var ship_demo;

var boats;
var boatPointMax;
var boatPoint;

//Inits & game core

export function initParamaters(parameters){

    //Init boats list
    boats = [];
    boatPointMax = 0;

    parameters.ships.forEach(function(boat){
        var id;
        switch(boat.name){
            case "Submarine":
                id = 0;
                break;
            case "Carrier":
                id = 1;
                break;
            case "Battleship":
                id = 2;
                break;
            case "Patrol Boat":
                id = 3;
                break;
            case "Cruiser":
                id = 4;
                break;
        }

        boats.push({id:id,name:boat.name,length:boat.length,count:boat.count,leftPlacement:boat.count,leftPlayer:boat.count});
        boatPointMax += boat.count * boat.length;
    });

    boatPoint = 0;

    //Set board parameters
    gameLineNumber = parameters.width;
    gameColNumber = parameters.height;

    gridCaseLength = windowsLength/(gameLineNumber+1);
    gridCaseHeight = windowsHeight/(gameColNumber+1);

    gameBoardLength = gridCaseLength*gameColNumber;
    gameBoardHeight = gridCaseLength*gameLineNumber;

}

export function init(){

    ship_demo = new ShipNotGame();
    Sh_ips = new ShipNotGame();
    Damage = new DamageNotGame();

    windowXInit = windowsOffsetLen;
    windowYInit = windowsOffsetHei;

    //Init Advanced ctx
    advCtx = new AdvancedCtx(context,);

    //Init Players
    var playerO = new Player(1,1);
    var playerE = new Player(2,0);
    var players = [];
    players.push(playerO);
    players.push(playerE);

    //Init grid
    grid = new Grid(gameColNumber,gameLineNumber,gridCaseLength,gridCaseHeight,gridTxtLength,gridColor);

    //Init Board
    board = new Board(grid,players);

    updateBoatTab();

    clock();
}

export function frame(){

    board.draw();

}

export function clock(){

    d = new Date();
    newTime = d.getMilliseconds();

    if(newTime-time>frameRate || (newTime<time && newTime+999-time>frameRate)){
        time = newTime;
        frame();
        t++;
    }

    setTimeout(clock, clockRate);
}


function readyClick(){

    if(gameReady()){
        sendReady(convertShips());
    }

}

function convertShips(){

    var player = board.players[0];

    var shipsToModel = [];

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
            x: ship.x,
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


//User interface

export function cursor(event){

    var x = event.clientX - windowsOffsetLen + window.scrollX;
    var y = event.clientY - windowsOffsetHei + window.scrollY;

    var len = parseInt(x / gridCaseLength);
    var hei = parseInt(y / gridCaseHeight);

    board.setSelectedCoord(len,hei);

}

export function cursorClick(){

    if(!board.selectedX && !board.selectedY && !placementPhase){

        //Switch the view
        displayOwnView = !displayOwnView;

        //Update Score view
        updateScoreUI();
    }

    if(placementPhase){

        var checked = document.querySelector('[name="ship"]:checked');

        if(checked != null){

            var value = parseInt(checked.value);

            if(value != 99){

                var valSel = value;
                var or = document.getElementById('o1').checked ? 0 : 1;
                if(board.checkConfilct(value,or)){

                    boats.forEach(function(boat){
                        if(boat.id == value){
                            boat.leftPlacement--;
                            board.players[0].addShip(new Ship(board.selectedX,board.selectedY,value,or));

                            if(!boat.leftPlacement){
                                valSel = -1;
                            }

                        }
                    });
                }
                updateBoatTab(valSel);
            } else {
                var typeDel = board.deleteShip();

                boats.forEach(function(boat){
                    if(boat.id == typeDel){
                        boat.leftPlacement++;
                    }
                });

                updateBoatTab(99);
            }
        }

    } else {
        board.setFireCoord();
    }

}

function updateBoatTab(val){

    document.getElementById("subLeftTab").innerHTML = "";
    document.getElementById("subLeftTab").appendChild(createBoatTab(val));

    drawBoatTab();
}

export function createBoatTab(val){

    var boatTab = document.createElement("div");

    boats.forEach(function(boat){

        var n;
        if(placementPhase){
            n = boat.leftPlacement;
        } else {
            n = boat.leftPlayer;
        }

        var btl = document.createElement("label");
        btl.setAttribute("for","s"+(boat.id+1));
        btl.setAttribute("id","s"+(boat.id+1)+"l");

        var can = document.createElement("canvas");
        can.setAttribute("id",boat.name+"C");
        can.setAttribute("class","display_ships_tab");

        var na = document.createElement("span");
        na.setAttribute("id","p"+(boat.id+1));
        na.innerHTML = boat.name;

        var inp = document.createElement("input");
        inp.setAttribute("type","radio");
        inp.setAttribute("id","s"+(boat.id+1));
        inp.setAttribute("name","ship");
        inp.setAttribute("value",boat.id);
        if(placementPhase){
            if(!n) inp.setAttribute("disabled","true");
            else if(val == boat.id) inp.setAttribute("checked",true);
        } else {
            inp.setAttribute("style","opacity: 0");
        }

        var nb = document.createElement("span");
        nb.setAttribute("id","n"+(boat.id+1));
        nb.innerHTML = "x"+n;

        btl.appendChild(can);
        btl.appendChild(na);
        btl.appendChild(inp);
        btl.appendChild(nb);

        boatTab.appendChild(btl);
        boatTab.appendChild(document.createElement("br"));
    });

    if(placementPhase){
        boatTab.appendChild(document.createElement("br"));

        var btl = document.createElement("label");
        btl.setAttribute("for","s6");
        btl.setAttribute("id","s6l");

        var na = document.createElement("span");
        na.innerHTML = "Delete ";

        var inp = document.createElement("input");
        inp.setAttribute("type","radio");
        inp.setAttribute("id","s6");
        inp.setAttribute("name","ship");
        inp.setAttribute("value","99");

        var nb = document.createElement("span");
        nb.setAttribute("style","color: rgba(0, 0, 0, 0)");
        nb.innerHTML = "x0";

        btl.appendChild(na);
        btl.appendChild(inp);
        btl.appendChild(nb);

        boatTab.appendChild(btl);
    }

    return boatTab;

}

export function drawBoatTab(){

    boats.forEach(function(boat){

        var element_ = document.getElementById(boat.name+"C");
        var context_ = element_.getContext("2d");
        var advCtx_ = new AdvancedCtx(context_);
        ship_demo.draw(boat.id,0,18,40,10,advCtx_);

    });

}

export function updateUI(){

    //Update UI switching from placement to fire phase
    placementPhase = false;
    document.getElementById("button_ready").style.display = "none";
    document.getElementById("button_fire").style.display = "block";

    document.getElementById("o1l").style.display = "none";
    document.getElementById("o2l").style.display = "none";
    document.getElementById("s6l").style.display = "none";
    document.getElementById("leftTab").innerHTML= "Score";

    updateBoatTab();
    updateUIFire();
}

document.getElementById('button_fire').addEventListener('click', sendFire);

export function updateUIFire(){

    if(isPlayerTurn()){
        document.getElementById("button_fire").disabled = false;
    } else {
        document.getElementById("button_fire").disabled = true;
    }
    setTimeout(updateView, 3000);
}

export function updateView(){
    if(isPlayerTurn()){
        displayOwnView = false;
    } else {
        displayOwnView = true;
    }
    updateScoreUI();
}

function updateScoreUI(){

    //Update Score view
    var subLeftTab;

    if(displayOwnView){

        subLeftTab = createBoatTab();

    } else {
        var score = boatPoint+" / "+boatPointMax;

        subLeftTab = document.createElement("p");
        subLeftTab.innerHTML = score;
    }

    document.getElementById("subLeftTab").innerHTML = "";
    document.getElementById("subLeftTab").appendChild(subLeftTab);

}


//Game checks

export function isPlayerTurn(){
    return !placementPhase && turn == playerNumber;
}

export function gameReady(){
    var ready = true;

    boats.forEach(function(boat){
        if(boat.leftPlacement) ready = false;
    });

    return ready;
}

export function setTurn(){
    turn = turn != 1 ? 1 : 2;
}

export function addEnemyFire(pos,resp){
    board.addPosEnemy(pos);
    board.resetFireCase();
    if(resp.hit){
        board.addEnemyDamage(pos);
        boatPoint ++;
        updateScoreUI();
    }
    setTurn();
    updateUIFire();
}

export function addOwnFire(pos){

    board.addPosOwn(pos);
    board.addOwnDamage(pos);

    setTurn();
    updateUIFire();
}

export function setTurnAction(resp){

    var hit = false;
    var char = String.fromCharCode(resp.location.x+64);

    if(resp.player){
        //Player is the one who fired
        hit = resp.hit;
    } else {
        //Player isn't the one who fired
        hit = hitOwn;
        hitOwn = false;
    }

    var actionMessage = hit ? "Hit" : "Miss";

    var message = char+resp.location.y+" - "+actionMessage;

    turnAction.message = message;
    turnAction.life = 25;
}

export function hitOwnF(){
    hitOwn = true;
}

/** @type {HTMLDialogElement} */
let dialogParamsEl = document.getElementById('dialog_params');

/** @type {HTMLFormElement} */
let settingsFormEl = document.getElementById('settings');

document.getElementById('button_params').addEventListener('click', function() {
  dialogParamsEl.showModal();
});

settingsFormEl.addEventListener('submit', function(event) {
  event.preventDefault();

  const inputs = event.target.querySelectorAll('input[type=color]');

  const colors = [...inputs].reduce((obj, input) => ({
    ...obj,
    [input.name]: input.value,
  }), {});

  setShipColors(colors);
  updateBoatTab();

  dialogParamsEl.close();
});
