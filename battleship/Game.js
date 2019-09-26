var canvas = document.getElementById("battleship");
var context = canvas.getContext("2d");
canvas.style.cursor = "crosshair";

frameRate = 100;
clockRate = 50;
var d = new Date();
var time = d.getMilliseconds();
var newTime;
var t = 0;

var windowsLength = canvas.width;
var windowsHeight = canvas.height;
var canvasBound = canvas.getBoundingClientRect();
var windowsOffsetLen = canvasBound.left;
var windowsOffsetHei = canvasBound.top;

var gameLineNumber = 10;
var gameColNumber = 10;

var gridCaseLength = windowsLength/(gameLineNumber+1);
var gridCaseHeight = windowsHeight/(gameColNumber+1);

var gameBoardLength = gridCaseLength*gameColNumber;
var gameBoardHeight = gridCaseLength*gameLineNumber;

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
    
    //Init Advanced ctx
    advCtx = new AdvancedCtx(context,);
    
    //Init Players
    player1 = new Player(1,$_GET("player")==1);
    player2 = new Player(2,$_GET("player")==2);
    players = [];
    players.push(player1);
    players.push(player2);
    
    //Init grid
    grid = new Grid(gameColNumber,gameLineNumber,gridCaseLength,gridCaseHeight,gridTxtLength,gridColor);
    
    //Init Board
    board = new Board(grid,players);
    
    player1.addShip(new Ship(1,1,1,0));
    player1.addShip(new Ship(3,2,2,0));
    player1.addShip(new Ship(4,3,0,0));
    player1.addShip(new Ship(4,4,4,2));
    player1.addShip(new Ship(5,5,3,2));
    //board.draw();
    
    clock();
}


function cursor(event){
    
    var x = event.clientX - windowsOffsetLen;
    var y = event.clientY - windowsOffsetHei;
    
    var len = parseInt(x / gridCaseLength);
    var hei = parseInt(y / gridCaseHeight);
    
    board.setSelectedCoord(len,hei); 
    
}

function cursorClick(){
    
    console.log(board.selectedX + " - " + board.selectedY);
    
    
    if(!board.selectedX && !board.selectedY){
        //Switch the view
        displayOwnView = !displayOwnView;
    }
    
}
