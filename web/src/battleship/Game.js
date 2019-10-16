/*import {AdvancedCtx} from "./AdvancedCtx.js";
import {Board} from "./Board.js";
import {DamageNotGame} from "./DamageNotGame.js";
import {Grid} from "./Grid.js";
import {Player} from "./Player.js";
import {Ship} from "./Ship.js";
import {ShipNotGame} from "./ShipNotGame.js";

import {$_GET} from "./Url.js";

import {initGamePage} from "../controler/main.js"*/

var canvas = document.getElementById("battleship_board");
var context = canvas.getContext("2d");
canvas.style.cursor = "crosshair";

var frameRate = 100;
var clockRate = 50;
var d = new Date();
var time = d.getMilliseconds();
var newTime;
var t = 0;
var turn = 1;

var Sh_ips;
var Damage;

var windowsLength = canvas.width;
var windowsHeight = canvas.height;
var canvasBound = canvas.getBoundingClientRect();
var windowsOffsetLen = canvasBound.left + window.scrollX;
var windowsOffsetHei = canvasBound.top + window.scrollY;

var gameLineNumber = 10;
var gameColNumber = 10;

var gridCaseLength = windowsLength/(gameLineNumber+1);
var gridCaseHeight = windowsHeight/(gameColNumber+1);

var gameBoardLength = gridCaseLength*gameColNumber;
var gameBoardHeight = gridCaseLength*gameLineNumber;

var sub = document.getElementById("subC");
var subC = sub.getContext("2d");
var subAC = new AdvancedCtx(subC);

var car = document.getElementById("carC");
var carC = car.getContext("2d");
var carAC = new AdvancedCtx(carC);

var bat = document.getElementById("batC");
var batC = bat.getContext("2d");
var batAC = new AdvancedCtx(batC);

var pat = document.getElementById("patC");
var patC = pat.getContext("2d");
var patAC = new AdvancedCtx(patC);

var cru = document.getElementById("cruC");
var cruC = cru.getContext("2d");
var cruAC = new AdvancedCtx(cruC);

var oceanWaveColor = "#5489d1";
var oceanColor = "#2f70c7";
var oceanColor2 = "#0a1727";
var gridColor = "#000000";
var boardColor = "#dd3030";
var gridTxtLength = 30;

var displayOwnView = true;
var boatPointMax;
var boatPoint;
var boatDefinition;

var advCtx;
var grid;
var board;

var placementPhase = true;

var nbSubmarine = 1;
var nbCarrier = 1;
var nbBattleship = 2;
var nbCruiser = 2;
var nbPatrolBoat = 3;

var playerNumber;

var windowXInit;
var windowYInit;

var ship_demo;
var boats;

function frame(){
    
    board.draw();
    
}

function clock(){
    
    d = new Date();
    newTime = d.getMilliseconds();
    
    if(newTime-time>frameRate || (newTime<time && newTime+999-time>frameRate)){
        time = newTime;
        frame();
        t++;
    }
    
    setTimeout(clock, clockRate);
}

function init(){
    
    boats = [{t:0,n:1},{t:1,n:1},{t:2,n:2},{t:3,n:3},{t:4,n:2}];
    
    ship_demo = new ShipNotGame();
    boatDefinition = new BoatDefinition();
    document.getElementById("subLeftTab").innerHTML = "";
    document.getElementById("subLeftTab").appendChild(createBoatTab());
    drawDemo();
    
    boatPointMax = 36;
    boatPoint = 0;

    playerNumber = $_GET("player");
    Sh_ips = new ShipNotGame();
    Damage = new DamageNotGame();
    
    if(!(playerNumber != 1 && playerNumber != 2)){
        
        initGamePage();
        
        windowXInit = windowsOffsetLen;
        windowYInit = windowsOffsetHei;
    
        //Init Advanced ctx
        advCtx = new AdvancedCtx(context,);

        //Init Players
        player1 = new Player(1,playerNumber==1);
        player2 = new Player(2,playerNumber==2);
        players = [];
        players.push(player1);
        players.push(player2);

        //Init grid
        grid = new Grid(gameColNumber,gameLineNumber,gridCaseLength,gridCaseHeight,gridTxtLength,gridColor);

        //Init Board
        board = new Board(grid,players);

        ship_demo.draw(0,0,18,40,10,subAC);
        ship_demo.draw(1,0,18,40,7,carAC);
        ship_demo.draw(2,0,18,40,10,batAC);
        ship_demo.draw(3,0,18,40,10,patAC);
        ship_demo.draw(4,0,18,40,10,cruAC);

        clock();
    }
}

function drawDemo(){
    
    sub = document.getElementById("subC");
    subC = sub.getContext("2d");
    subAC = new AdvancedCtx(subC);

    car = document.getElementById("carC");
    carC = car.getContext("2d");
    carAC = new AdvancedCtx(carC);

    bat = document.getElementById("batC");
    batC = bat.getContext("2d");
    batAC = new AdvancedCtx(batC);

    pat = document.getElementById("patC");
    patC = pat.getContext("2d");
    patAC = new AdvancedCtx(patC);
    
    cru = document.getElementById("cruC");
    cruC = cru.getContext("2d");
    cruAC = new AdvancedCtx(cruC);
    
    ship_demo.draw(0,0,18,40,10,subAC);
    ship_demo.draw(1,0,18,40,7,carAC);
    ship_demo.draw(2,0,18,40,10,batAC);
    ship_demo.draw(3,0,18,40,10,patAC);
    ship_demo.draw(4,0,18,40,10,cruAC);
}

function cursor(event){
    
    var x = event.clientX - windowsOffsetLen + window.scrollX;
    var y = event.clientY - windowsOffsetHei + window.scrollY;
    
    var len = parseInt(x / gridCaseLength);
    var hei = parseInt(y / gridCaseHeight);
    
    board.setSelectedCoord(len,hei); 
    
}

function isPlayerTurn(){
    return !placementPhase && turn == playerNumber;
}

function createBoatTab(){
    
    var boatTab = document.createElement("div");
    
    var boatsDef = [];
    
    boats.forEach(function(boat){
        var bd = {boat:boat,boatD:boatDefinition.getBoat(boat.t)};
        boatsDef.push(bd);
    });
    
    boatsDef.forEach(function(bdf){
        
        var btl = document.createElement("label");
        btl.setAttribute("for","s"+(bdf.boat.t+1));
        btl.setAttribute("id","s"+(bdf.boat.t+1)+"l");
        
        var can = document.createElement("canvas");
        can.setAttribute("id",bdf.boatD.sn);
        can.setAttribute("class","display_ships_tab");
        
        var na = document.createElement("span");
        na.setAttribute("id","p"+(bdf.boat.t+1));
        na.innerHTML = bdf.boatD.n;
        
        var inp = document.createElement("input");
        inp.setAttribute("type","radio");
        inp.setAttribute("id","s"+(bdf.boat.t+1));
        inp.setAttribute("name","ship");
        inp.setAttribute("value","s"+bdf.boat.t);
        
        var nb = document.createElement("span");
        nb.setAttribute("id","n"+(bdf.boat.t+1));
        nb.innerHTML = "x"+bdf.boat.n;
        
        btl.appendChild(can);
        btl.appendChild(na);
        btl.appendChild(inp);
        btl.appendChild(nb);
        
        boatTab.appendChild(btl);
        boatTab.appendChild(document.createElement("br"));
    });
    
    return boatTab;
    
}

function cursorClick(){
    
    
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
        
        var or = document.getElementById('o1').checked ? 0 : 1;
        
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
            
        }
        
    } else {
        board.setFireCoord();
    }
    
}

function updateUIFire(){
    
    if(isPlayerTurn()){
        document.getElementById("button_fire").disabled = false;
    } else {
        document.getElementById("button_fire").disabled = true;
    }
    
    setTimeout(updateView, 1000);
    
}

function updateView(){
    if(isPlayerTurn()){
        displayOwnView = false;
    } else {
        displayOwnView = true;
    }
}

function fire(){
    
    if(isPlayerTurn() && board.firePositionValid()){
        
        //Send to server
        
        
        
        
    }
    
}

function gameReady(){
    return !nbSubmarine && !nbCarrier && !nbBattleship && !nbPatrolBoat && !nbCruiser;
}

function updateUI(){
    
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

function updateShipNumber(){
    
    document.getElementById('n1').innerHTML = "x"+nbSubmarine;
    document.getElementById('n2').innerHTML = "x"+nbCarrier;
    document.getElementById('n3').innerHTML = "x"+nbBattleship;
    document.getElementById('n4').innerHTML = "x"+nbPatrolBoat;
    document.getElementById('n5').innerHTML = "x"+nbCruiser;
    
}