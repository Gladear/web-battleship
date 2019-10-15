class Board {
    
    constructor(grid,players) {
        this.grid = grid;
        this.players = players;
        this.selectedX = 1;
        this.selectedY = 0;
        this.fireX = 1;
        this.fireY = 0;
        this.fireOwn = [];
        this.fireEnemy = [];
    }
    
    getGrid(){
        return this.grid;
    }
    
    draw(){
        
        //Clear the board
        this.clearBoard();
        
        //Display the grid
        this.grid.draw();
        
        //Display the ocean
        this.displayOcean();
        
        //Display the boats
        players.forEach( function(player){
            if(player.getCurrent() && displayOwnView){
                player.drawShips(true);
            } else if (!player.getCurrent() && !displayOwnView){
                player.drawShips(false);
            }
        });
        
        //Display the grid over de boats
        for(var i = 1; i < gameLineNumber+1; i++){
            for(var j = 1; j < gameColNumber+1; j++){  
                advCtx.setParams(i*gridCaseLength+1,j*gridCaseLength+1,1,0);
                this.drawBoardGrid();
            }
        }
        
        //Display the switch button
        this.drawSwitchButton();
        
        //Display the selected case
        this.drawCase();
        
        //Display the selected fire case
        this.drawFireCase();
        
        //Display already fired cases
        this.drawFire();
    }
    
    clearBoard(){
        advCtx.setParams(0,0,1,0);
    
        advCtx.begin(1,"#ffffff","#ffffff");
        advCtx.fillRect(0,0,windowsLength,windowsHeight);
        advCtx.stroke();
    }
    
    displayOcean(){
        
        advCtx.setParams(gridCaseLength,gridCaseHeight,1,0);
    
        advCtx.grdOcean = advCtx.ctx.createLinearGradient(0, gameBoardHeight/2 + Math.cos(t/10)*(gameBoardHeight/2), gameBoardLength, gameBoardHeight/2 - Math.cos(t/10)*(gameBoardHeight/2));
        advCtx.grdOcean.addColorStop(0, oceanColor);
        advCtx.grdOcean.addColorStop(1, oceanColor2);

        advCtx.begin(1,advCtx.grdOcean,advCtx.grdOcean);
        advCtx.fillRect(0,0,gameBoardLength,gameBoardHeight);
        advCtx.stroke();
        
    }
    
    drawBoardGrid(){
    
        var len = gridCaseLength/10;
        var hei = gridCaseHeight/10;

        advCtx.begin(2,boardColor,boardColor);

        advCtx.moveTo(0,0);
        advCtx.lineTo(0,hei);
        advCtx.moveTo(0,0);
        advCtx.lineTo(len,0);

        advCtx.moveTo(gridCaseLength,0);
        advCtx.lineTo(gridCaseLength,hei);
        advCtx.moveTo(gridCaseLength,0);
        advCtx.lineTo(gridCaseLength-len,0);

        advCtx.moveTo(0,gridCaseHeight);
        advCtx.lineTo(0,gridCaseHeight-hei);
        advCtx.moveTo(0,gridCaseHeight);
        advCtx.lineTo(len,gridCaseHeight);

        advCtx.moveTo(gridCaseLength,gridCaseHeight);
        advCtx.lineTo(gridCaseLength,gridCaseHeight-hei);
        advCtx.moveTo(gridCaseLength,gridCaseHeight);
        advCtx.lineTo(gridCaseLength-len,gridCaseHeight);

        advCtx.stroke();
        
        advCtx.begin(0.5,boardColor,boardColor);
        advCtx.rect(0,0,gridCaseLength,gridCaseHeight);
        advCtx.stroke();

    }
    
    setSelectedCoord(selectedX,selectedY){
        this.selectedX = selectedX;
        this.selectedY = selectedY;
    }
    
    setFireCoord(){
        this.fireX = this.selectedX;
        this.fireY = this.selectedY;
    }
    
    drawBoardCase(x,y,c1,c2){
            
        advCtx.setParams(x*gridCaseLength,y*gridCaseLength,1,0);

        var cStrokeColor = "rgba(186, 68, 46, 0.74)";
        var cFillColor = "rgba(204, 92, 58, 0.49)";

        advCtx.begin(3,c1,c2);

        advCtx.fillRect(0,0,gridCaseLength,gridCaseLength);
        advCtx.rect(0,0,gridCaseLength,gridCaseLength);

        advCtx.stroke();
        
    }
    
    drawCase(){
        
        if((!this.selectedX && !this.selectedY) || (this.selectedX && this.selectedX<11 && this.selectedY && this.selectedY<11)){

            var cStrokeColor;
            var cFillColor;
            
            if(!this.selectedX && !this.selectedY){
                cStrokeColor = "rgba(68, 186, 46, 0.74)";
                cFillColor = "rgba(64, 204, 58, 0.49)";
            } else {
                cStrokeColor = "rgba(186, 176, 46, 0.74)";
                cFillColor = "rgba(204, 193, 58, 0.49)";
            }
            
            this.drawBoardCase(this.selectedX,this.selectedY,cStrokeColor,cFillColor);
            
        }
        
    }
    
    resetFireCase(){
        this.fireX = 0;
        this.fireY = 1;
    }
    
    drawFireCase(){
        
        if(!displayOwnView && !placementPhase && this.fireX && this.fireX<11 && this.fireY && this.fireY<11){
            
            var cStrokeColor = "rgba(186, 68, 46, 0.74)";
            var cFillColor = "rgba(204, 92, 58, 0.49)";
            
            this.drawBoardCase(this.fireX,this.fireY,cStrokeColor,cFillColor);
            
        }
        
    }
    
    drawFire(){
        
        var cStrokeColor = "rgba(186, 127, 46, 0.74)";
        var cFillColor = "rgba(204, 170, 58, 0.49)";
        
        if(displayOwnView){
            this.fireOwn.forEach(function(pos){
               board.drawBoardCase(pos.x,pos.y,cStrokeColor,cFillColor); 
            });
        } else {
            this.fireEnemy.forEach(function(pos){
               board.drawBoardCase(pos.x,pos.y,cStrokeColor,cFillColor); 
            });
        }
    }
    
    drawSwitchButton(){
        
        var cStroke = "#000000";
        var cFill;
        
        if(displayOwnView){
            cFill = "#6c6969";
        } else {
            cFill = "#c73a3a";
        }
        
        advCtx.setParams(gridCaseLength/2,gridCaseHeight/2,gridCaseLength/15,0);
        
        advCtx.begin(1,cStroke,cFill);
        
        advCtx.moveTo(2.5,-3.5);
        advCtx.lineTo(2.5,-.5);
        advCtx.lineTo(-3.5,-.5);
        advCtx.lineTo(-3.5,1.5);
        advCtx.lineTo(-6.5,-2);
        advCtx.lineTo(-3.5,-5.5);
        advCtx.lineTo(-3.5,-3.5);
        advCtx.lineTo(2.5,-3.5);
        
        advCtx.fill();
        advCtx.stroke();
        
        advCtx.begin(1,cStroke,cFill);
        
        advCtx.moveTo(-2.5,3.5);
        advCtx.lineTo(-2.5,.5);
        advCtx.lineTo(3.5,.5);
        advCtx.lineTo(3.5,-1.5);
        advCtx.lineTo(6.5,2);
        advCtx.lineTo(3.5,5.5);
        advCtx.lineTo(3.5,3.5);
        advCtx.lineTo(-2.5,3.5);
        
        advCtx.fill();
        advCtx.stroke();
        
    }
    
    checkPos(posPlayer,posShip){
        
        var noConflict = true;
        
        posPlayer.forEach( function(posP){
            posShip.forEach( function(posS){
                if(posP.x == posS.x && posP.y == posS.y) noConflict = false;
            });
        });
        
        return noConflict;
    }
    
    checkConfilct(type,rotation){
        
        var lenShip;
        var posShip = [];
        var noConflict = true;
        
        switch(type){
            case 0:
                lenShip = 3;
                break;
            case 1:
                lenShip = 6;
                break;
            case 2:
                lenShip = 4;
                break;
            case 3:
                lenShip = 2;
                break;
            case 4:
                lenShip = 3;
                break;
        }
        
        if(rotation){
            for(var i=0; i<lenShip; i++){
                var pos = {x: this.selectedX, y: this.selectedY+i};
                posShip.push(pos);
            }
        } else {
            for(var i=0; i<lenShip; i++){
                var pos = {x: this.selectedX+i, y: this.selectedY};
                posShip.push(pos);
            }
        }
        
        posShip.forEach( function(p){
            if(pos.x<1 || pos.x > gameLineNumber || pos.y<1 || pos.y>gameColNumber) noConflict = false;
        });
        
        if(noConflict){
            var posPlayer = board.players[playerNumber-1].getShipsPos();
            noConflict = this.checkPos(posPlayer,posShip);
        }
        
        return noConflict;
    }
    
    deleteShip(){
        
        board.typeDel = -1;
        
        this.players[playerNumber-1].ships.forEach( function(ship){
            ship.getPositions().forEach( function(pos){
                
                if(pos.x == board.selectedX && pos.y == board.selectedY){
                    board.typeDel = ship.type;
                    board.players[playerNumber-1].removeShip(ship);
                }
                
            });  
        });
        
        return this.typeDel;
    }
    
    addPosEnemy(pos){
        this.fireEnemy.push(pos);
    }
    
    addPosOwn(pos){
        this.fireOwn.push(pos);
    }
    
    firePositionValid(){
        var valid = true
        
        this.fireEnemy.forEach(function(pos){
            if(pos.x == this.fireX && pos.y == this.fireY) valid = false;
        });
        
        return valid;
    }
    
}