import {AdvancedCtx} from "./AdvancedCtx.js";
import {Board} from "./Board.js";
import {DamageNotGame} from "./DamageNotGame.js";
import {Grid} from "./Grid.js";
import {Player} from "./Player.js";
import {Ship} from "./Ship.js";
import {ShipNotGame} from "./ShipNotGame.js";

import {$_GET} from "./Url.js";

var canvas = document.getElementById("battleship_board");
var context = canvas.getContext("2d");
canvas.style.cursor = "crosshair";

var frameRate = 100;
var clockRate = 50;
var d = new Date();
var time = d.getMilliseconds();
var newTime;
export var t = 0;
var turn = 1;

export var Sh_ips;
var Damage;

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

document.getElementById('battleship_board').onmousemove = cursor;
document.getElementById('battleship_board').onclick = cursorClick;

export var oceanWaveColor = "#5489d1";
export var oceanColor = "#2f70c7";
export var oceanColor2 = "#0a1727";
export var gridColor = "#000000";
export var boardColor = "#dd3030";
var gridTxtLength = 30;

export var displayOwnView = true;
var boatDefinition;

export var advCtx;
var grid;
export var board;

var placementPhase = true;

export var playerNumber;

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
            case "Carier":
                id = 1;
                break;
            case "Battleship":
                id = 2;
                break;
            case "Patrol Boat":
                id = 3;
                break;
            case "Crusier":
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

function init(){
    
    var bs = [{name:"Submarine",length:3,count:6},{name:"Battleship",length:4,count:1},{name:"Patrol Boat",length:2,count:2}];
    var parameters = {ships:bs,width:10,height:10};
    initParamaters(parameters);
    ship_demo = new ShipNotGame();

    playerNumber = $_GET("player");
    Sh_ips = new ShipNotGame();
    Damage = new DamageNotGame();

    if(!(playerNumber != 1 && playerNumber != 2)){
        windowXInit = windowsOffsetLen;
        windowYInit = windowsOffsetHei;

        //Init Advanced ctx
        advCtx = new AdvancedCtx(context,);

        //Init Players
        var player1 = new Player(1,playerNumber==1);
        var player2 = new Player(2,playerNumber==2);
        var players = [];
        players.push(player1);
        players.push(player2);

        //Init grid
        grid = new Grid(gameColNumber,gameLineNumber,gridCaseLength,gridCaseHeight,gridTxtLength,gridColor);

        //Init Board
        board = new Board(grid,players);
        
        updateBoatTab();

        clock();
    }
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

    if(placementPhase){

        /*var or = document.getElementById('o1').checked ? 0 : 1;

        if (document.getElementById('s1').checked && board.checkConfilct(0,or)) {
            //Submarine
            nbSubmarine--;
            if(!nbSubmarine){
                document.getElementById('s1').disabled = true;
                document.getElementById('s1').checked = false;
                document.getElementById('p1').style.color = "rgba(0, 0, 0, 0.5)";
            }

            updateShipNumber();
            board.players[playerNumber-1].addShip(new Ship(board.selectedX,board.selectedY,0,or));

        }

        if (document.getElementById('s2').checked && board.checkConfilct(1,or)) {
            //Carrier
            nbCarrier--;
            if(!nbCarrier){
                document.getElementById('s2').disabled = true;
                document.getElementById('s2').checked = false;
                document.getElementById('p2').style.color = "rgba(0, 0, 0, 0.5)";
            }

            updateShipNumber();
            board.players[playerNumber-1].addShip(new Ship(board.selectedX,board.selectedY,1,or));

        }

        if (document.getElementById('s3').checked && board.checkConfilct(2,or)) {
            //Battleship
            nbBattleship--;
            if(!nbBattleship){
                document.getElementById('s3').disabled = true;
                document.getElementById('s3').checked = false;
                document.getElementById('p3').style.color = "rgba(0, 0, 0, 0.5)";
            }

            updateShipNumber();
            board.players[playerNumber-1].addShip(new Ship(board.selectedX,board.selectedY,2,or));

        }

        if (document.getElementById('s4').checked && board.checkConfilct(3,or)) {
            //Patrol Boat
            nbPatrolBoat--;
            if(!nbPatrolBoat){
                document.getElementById('s4').disabled = true;
                document.getElementById('s4').checked = false;
                document.getElementById('p4').style.color = "rgba(0, 0, 0, 0.5)";
            }

            updateShipNumber();
            board.players[playerNumber-1].addShip(new Ship(board.selectedX,board.selectedY,3,or));

        }

        if (document.getElementById('s5').checked && board.checkConfilct(4,or)) {
            //Cruiser
            nbCruiser--;
            if(!nbCruiser){
                document.getElementById('s5').disabled = true;
                document.getElementById('s5').checked = false;
                document.getElementById('p5').style.color = "rgba(0, 0, 0, 0.5)";
            }

            updateShipNumber();
            board.players[playerNumber-1].addShip(new Ship(board.selectedX,board.selectedY,4,or));

        }

        if (document.getElementById('s6').checked) {
            //Delete
            var typeDel = board.deleteShip();

            if(typeDel != -1){

                switch(typeDel){
                    case 0:
                        nbSubmarine++;
                        document.getElementById('s1').disabled = false;
                        document.getElementById('p1').style.color = "rgba(0, 0, 0, 1)";
                        document.getElementById('n1').innerHTML = "x"+nbSubmarine;
                        break;
                    case 1:
                        nbCarrier++;
                        document.getElementById('s2').disabled = false;
                        document.getElementById('p2').style.color = "rgba(0, 0, 0, 1)";
                        document.getElementById('n2').innerHTML = "x"+nbCarrier;
                        break;
                    case 2:
                        nbBattleship++;
                        document.getElementById('s3').disabled = false;
                        document.getElementById('p3').style.color = "rgba(0, 0, 0, 1)";
                        document.getElementById('n3').innerHTML = "x"+nbBattleship;
                        break;
                    case 3:
                        nbPatrolBoat++;
                        document.getElementById('s4').disabled = false;
                        document.getElementById('p4').style.color = "rgba(0, 0, 0, 1)";
                        document.getElementById('n4').innerHTML = "x"+nbPatrolBoat;
                        break;
                    case 4:
                        nbCruiser++;
                        document.getElementById('s5').disabled = false;
                        document.getElementById('p5').style.color = "rgba(0, 0, 0, 1)";
                        document.getElementById('n5').innerHTML = "x"+nbCruiser;
                        break;
                }

            }

        }*/
        
        var checked = document.querySelector('[name="ship"]:checked');
        
        if(checked != null){
            
            var value = checked.value;
            
            if(value != 99){
                
                var or = document.getElementById('o1').checked ? 0 : 1;
                if(board.checkConfilct(value,or)){
                    
                    boats.forEach(function(boat){
                        if(boat.id == value){
                            boat.leftPlacement--;
                            updateBoatTab();
                            board.players[playerNumber-1].addShip(new Ship(board.selectedX,board.selectedY,value,or));
                        }
                    });         
                }
            }
        }

    } else {
        board.setFireCoord();
    }

}

function updateBoatTab(){
    
    document.getElementById("subLeftTab").innerHTML = "";
    document.getElementById("subLeftTab").appendChild(createBoatTab());
    
    drawBoatTab();
}

export function createBoatTab(){

    var boatTab = document.createElement("div");

    boats.forEach(function(boat){

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

        var nb = document.createElement("span");
        nb.setAttribute("id","n"+(boat.id+1));
        var n;
        if(placementPhase){
            n = boat.leftPlacement;
        } else {
            n = boat.leftPlayer;
        }
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


export function updateView(){
    if(isPlayerTurn()){
        displayOwnView = false;
    } else {
        displayOwnView = true;
    }
}

export function updateUI(){

    //Update UI switching from placement to fire phase
    placementPhase = false;
    document.getElementById("button_ready").style.display = "none";
    document.getElementById("button_fire").style.display = "block";

    updateUIFire();

    document.getElementById("o1l").style.display = "none";
    document.getElementById("o2l").style.display = "none";
    document.getElementById("s6l").style.display = "none";

    document.getElementById("leftTab").innerHTML= "Score";

    nbSubmarine = 1;
    nbCarrier = 1;
    nbBattleship = 2;
    nbCruiser = 2;
    nbPatrolBoat = 3;

    updateShipNumber();
}

export function updateUIFire(){

    if(isPlayerTurn()){
        document.getElementById("button_fire").disabled = false;
    } else {
        document.getElementById("button_fire").disabled = true;
    }

    setTimeout(updateView, 1000);

}


//Game checks

export function isPlayerTurn(){
    return !placementPhase && turn == playerNumber;
}

export function gameReady(){
    return !nbSubmarine && !nbCarrier && !nbBattleship && !nbPatrolBoat && !nbCruiser;
}


document.body.onload = init;
