var canvas = document.getElementById("battleship_board");
var context = canvas.getContext("2d");
canvas.style.cursor = "crosshair";

frameRate = 100;
clockRate = 50;
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
        
        var ship_demo = new ShipNotGame();

        ship_demo.draw(0,0,18,40,10,subAC);
        ship_demo.draw(1,0,18,40,7,carAC);
        ship_demo.draw(2,0,18,40,10,batAC);
        ship_demo.draw(3,0,18,40,10,patAC);
        ship_demo.draw(4,0,18,40,10,cruAC);

        clock();
    }
}

function cursor(event){
    
    var x = event.clientX - windowsOffsetLen + window.scrollX;
    var y = event.clientY - windowsOffsetHei + window.scrollY;
    
    var len = parseInt(x / gridCaseLength);
    var hei = parseInt(y / gridCaseHeight);
    
    board.setSelectedCoord(len,hei); 
    
}

function isPlayerTurn(){
    return turn == playerNumber;
}

function firePositionValid(){
    //TODO LOIC
    return true;
}

function cursorClick(){
    
    
    if(!board.selectedX && !board.selectedY){
        //Switch the view
        displayOwnView = !displayOwnView;
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
        
    }
    
}

function updateUIFire(){
    
    if(isPlayerTurn()){
        document.getElementById("button_fire").disabled = "false";
    } else {
        document.getElementById("button_fire").disabled = "true";
    }
    
}

function recieveFire(){
    
    //Recieve enemy fire
    
    
    //Update the UI
    turn = playerNumber;
    updateUIFire();
}

function fire(){
    
    if(isPlayerTurn() && firePositionValid()){
        
        //Send to server
        
        
        //Update the UI
        turn = playerNumber==1 ? 2 : 1;
        updateUIFire();
        
    }
    
    console.log("test");
    
}

function gameReady(){
    //return !nbSubmarine && !nbCarrier && !nbBattleship && !nbPatrolBoat && !nbCruiser;
    return true;
}

function updateUI(){
    
    placementPhase = false;
    document.getElementById("button_ready").style.display = "none";
    document.getElementById("button_fire").style.display = "block";
    
    updateUIFire();
    
    document.getElementById("o1l").style.display = "none";
    document.getElementById("o2l").style.display = "none";
    document.getElementById("s6l").style.display = "none";
    
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