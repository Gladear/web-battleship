var hitboxes = false;
var boatStrokeColor = "#414141";
var boatFillColor = "#b1aeae";
var hitboxColor = "#ff1e1e";

class Ship {
    constructor(x, y, type, rotation) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.rotation = rotation;
        this.offsetSwim = Math.floor(Math.random() * 100);
        this.offsetSwimWidth = Math.floor(Math.random() * 1000)/950;
        this.offsetSwimSpeed = Math.floor(Math.random() * 1000)/950;
        this.offsetSwimDirection = Math.floor(Math.random() * 2) ? 1 : -1;
    }
    
    getX() {
        return this.x;
    }
    
    setX(x) {
        this.x = x;
    }
    
    getY() {
        return this.y;
    }
    
    setY(y) {
        this.y = y;
    }
    
    getType() {
        return this.ctx;
    }
    
    setType(type) {
        this.type = type;
    }
    
    getRotation() {
        return this.rotation;
    }
    
    setRotation(rotation) {
        this.rotation = rotation;
    }
    
    draw(own){
        
        if(own){
            
            var rot;
            var rot2 = 1;

            switch(this.rotation){
                case 0:
                    rot = 0;
                    break;
                case 1:
                    rot = 90;
                    break;
                case 2: 
                    rot = 0;
                    rot2 = -1
                    break;
                case 3:
                    rot = -90;
                    break;
            }
            
            var offsetSwimX = Math.cos(this.offsetSwimDirection*(t+this.offsetSwim)/(1+this.offsetSwimSpeed))*(1+this.offsetSwimWidth);
            var offsetSwimY = Math.sin(this.offsetSwimDirection*(t+this.offsetSwim)/(1+this.offsetSwimSpeed)-.5)*(1+this.offsetSwimWidth);

            advCtx.setParams(gridCaseLength*(this.x+.5)+offsetSwimX,gridCaseHeight*(this.y+.5)+offsetSwimY,gridCaseLength/5*rot2,rot);
            switch(this.type){
                case 0: //Submarine
                    this.drawSubmarine();
                    break;
                case 1: //Carrier
                    this.drawCarrier();
                    break;
                case 2: //Battleship
                    this.drawBattleship();
                    break;
                case 3: //Patrol Boat
                    this.drawPatrolBoat();
                    break;
                case 4: //Destroyer
                    this.drawDestroyer();
                    break;
            }
            
        } else {
            
        }     
        
    }
    
    drawSubmarine(){
        
        if(hitboxes){
            advCtx.begin(2,hitboxColor);
            advCtx.rect(-2.5,-2.5,15,5);
            advCtx.stroke();
        }

        advCtx.begin(2,boatStrokeColor,boatFillColor);

        advCtx.moveTo(6.5,-1.5);
        advCtx.lineTo(6.5,-3);
        advCtx.lineTo(7.5,-3);
        advCtx.lineTo(7.5,-2.5);
        advCtx.lineTo(8.5,-2.5);
        advCtx.lineTo(8.5,-1.5);

        advCtx.fill();
        advCtx.stroke();

        advCtx.begin(2,boatStrokeColor,boatFillColor);

        advCtx.moveTo(-0.25,-0.25);
        advCtx.quadraticCurveTo(0.2,0,0.5,-0.5);
        advCtx.quadraticCurveTo(0.75,-1,5.5,-1.5)
        advCtx.lineTo(9.5,-1.5);
        advCtx.bezierCurveTo(11,-0.5,11,0.5,9.5,1.5);
        advCtx.lineTo(5.5,1.5);
        advCtx.quadraticCurveTo(0.75,1,0.5,0.5);
        advCtx.quadraticCurveTo(0.2,0,-0.25,0.25);
        advCtx.quadraticCurveTo(-0.25,0.75,-0.5,1);
        advCtx.lineTo(-0.5,0.25);
        advCtx.bezierCurveTo(-0.75,0.2,-0.75,-0.2,-0.5,-0.25);
        advCtx.lineTo(-0.5,-1);
        advCtx.quadraticCurveTo(-0.25,-0.75,-0.25,-0.25);

        advCtx.fill();
        advCtx.stroke();
    }
    
    drawCarrier(){
        
        if(hitboxes){
            advCtx.begin(2,hitboxColor);
            advCtx.rect(-2.5,-2.5,30,5);
            advCtx.stroke();
        }
        
        advCtx.begin(2,"#000000","#000000");

        advCtx.moveTo(2,1.75);
        advCtx.lineTo(.5,1.75);
        advCtx.lineTo(.5,1.90);
        advCtx.moveTo(.5,1.75);
        advCtx.lineTo(.5,1.60);

        advCtx.stroke();
        
        advCtx.begin(2,boatStrokeColor,boatFillColor);

        advCtx.moveTo(.5,-.5);
        advCtx.lineTo(3.5,-.5);
        advCtx.lineTo(3.5,-2.5);
        advCtx.lineTo(2,-2.5);
        advCtx.lineTo(2,-3.5);
        advCtx.lineTo(1.5,-3.5);
        advCtx.lineTo(1.5,-2.5);
        advCtx.lineTo(.5,-2.5);
        advCtx.lineTo(.5,-.5);

        advCtx.fill();
        advCtx.stroke();
        
        advCtx.begin(2,boatStrokeColor,boatFillColor);

        advCtx.moveTo(-1.5,-.5);
        advCtx.lineTo(26.5,-.5);
        advCtx.lineTo(26.5,0);
        advCtx.quadraticCurveTo(26,0,25.5,1.5);
        advCtx.lineTo(26,1.5);
        advCtx.bezierCurveTo(26.5,1.5,26.5,2,26,2);
        advCtx.lineTo(1.5,2);
        advCtx.lineTo(1,1.5);
        advCtx.lineTo(0,1.5);
        advCtx.lineTo(0,2);
        advCtx.lineTo(-.5,2);
        advCtx.lineTo(-.5,1.5);
        advCtx.lineTo(-1.25,1.5);
        advCtx.lineTo(-1.5,.5);
        advCtx.lineTo(-1.5,-.5);

        advCtx.fill();
        advCtx.stroke();
        
    }
                
    drawBattleship(){
        
        if(hitboxes){
            advCtx.begin(2,hitboxColor);
            advCtx.rect(-2.5,-2.5,20,5);
            advCtx.stroke();
        }
        
        advCtx.begin(2,boatStrokeColor,boatFillColor);

        advCtx.moveTo(1.5,-.5);
        advCtx.lineTo(1.5,-1.5);
        advCtx.lineTo(2.5,-1.5);
        advCtx.lineTo(2.5,-1);
        advCtx.lineTo(4.5,-1);
        advCtx.lineTo(4.5,-1.5);
        advCtx.lineTo(6.5,-1.5);
        advCtx.lineTo(6.5,-.5);
        advCtx.lineTo(7,-.5);
        advCtx.lineTo(7,-1);
        advCtx.lineTo(7.5,-1);
        advCtx.lineTo(7.5,-1.5);
        advCtx.lineTo(8.5,-1.5);
        advCtx.lineTo(8.5,-.5);
        advCtx.lineTo(9.5,-.5);
        advCtx.lineTo(9.5,-2);
        advCtx.lineTo(10.5,-2);
        advCtx.lineTo(10.5,-3.5);
        advCtx.lineTo(11,-3.5);
        advCtx.lineTo(11,-2);
        advCtx.lineTo(12.5,-2);
        advCtx.lineTo(14.5,-.5);
        advCtx.lineTo(1.5,-.5);

        advCtx.fill();
        advCtx.stroke();
        
        advCtx.begin(2,boatStrokeColor,boatFillColor);

        advCtx.moveTo(-1.5,-.5);
        advCtx.lineTo(9.5,-.5);
        advCtx.quadraticCurveTo(15.5,-.75,16.5,-1);
        advCtx.quadraticCurveTo(15,1,15.5,1.5);
        advCtx.lineTo(10.5,1.5);
        advCtx.quadraticCurveTo(10.75,1.90,11,2);
        advCtx.bezierCurveTo(11,2.25,9,2.25,9,2);
        advCtx.quadraticCurveTo(8.75,1.90,8.5,1.5);
        advCtx.lineTo(5.5,1.5);
        advCtx.quadraticCurveTo(2,1.5,1,1);
        advCtx.lineTo(.5,1.5);
        advCtx.lineTo(0,1.5);
        advCtx.lineTo(-.5,1);
        advCtx.lineTo(-1,1);
        advCtx.quadraticCurveTo(-1,0,-1.5,-.5);

        advCtx.fill();
        advCtx.stroke();
        
    }
    
    drawPatrolBoat(){
        
        if(hitboxes){
            advCtx.begin(2,hitboxColor);
            advCtx.rect(-2.5,-2.5,10,5);
            advCtx.stroke();
        }
        
        advCtx.begin(2,boatStrokeColor,boatFillColor);

        advCtx.moveTo(1.5,0);
        advCtx.lineTo(1.5,-2.25);
        advCtx.lineTo(2.25,-2.25);
        advCtx.lineTo(3.25,-1.5);
        advCtx.lineTo(4.5,-1.5);
        advCtx.lineTo(6,0);
        advCtx.lineTo(1.5,0);

        advCtx.fill();
        advCtx.stroke();
        
        advCtx.begin(2,boatStrokeColor,boatFillColor);

        advCtx.moveTo(-2.5,0);
        advCtx.lineTo(-2.5,.5);
        advCtx.lineTo(-1.5,.5);
        advCtx.lineTo(-1.5,1.5);
        advCtx.lineTo(5.5,1.5);
        advCtx.quadraticCurveTo(7.5,1,7.5,-.5);
        advCtx.quadraticCurveTo(6.5,0,3.5,0);
        advCtx.lineTo(-2.5,0);

        advCtx.fill();
        advCtx.stroke();
        
    }
    
    drawDestroyer(){
        
        if(hitboxes){
            advCtx.begin(2,hitboxColor);
            advCtx.rect(-2.5,-2.5,15,5);
            advCtx.stroke();
        }
        
        advCtx.begin(2,boatStrokeColor,boatFillColor);

        advCtx.moveTo(-.5,0);
        advCtx.lineTo(-.5,-.5);
        advCtx.lineTo(2.5,-.5);
        advCtx.lineTo(2.5,0);
        advCtx.lineTo(3.5,0);
        advCtx.lineTo(3.5,-1);
        advCtx.lineTo(8.5,-1);
        advCtx.lineTo(8.5,-2);
        advCtx.lineTo(10.5,-2);
        advCtx.lineTo(10.5,-1.5);
        advCtx.lineTo(11.5,-1.5);
        advCtx.lineTo(11.5,0);
        advCtx.lineTo(-.5,0);

        advCtx.fill();
        advCtx.stroke();
        
        advCtx.begin(2,boatStrokeColor,boatFillColor);

        advCtx.moveTo(.5,0);
        advCtx.lineTo(0,-1.5);
        advCtx.lineTo(1,-1.75);
        advCtx.lineTo(1.5,0);
        advCtx.lineTo(4,0);
        advCtx.lineTo(3.5,-1.5);
        advCtx.lineTo(4.5,-1.75);
        advCtx.lineTo(5,0);
        advCtx.lineTo(.5,0);

        advCtx.fill();
        advCtx.stroke();
        
        advCtx.begin(2,boatStrokeColor,boatFillColor);

        advCtx.moveTo(-2,0);
        advCtx.lineTo(7.5,0);
        advCtx.quadraticCurveTo(8,0,8.5,-.5);
        advCtx.lineTo(12,-.5);
        advCtx.lineTo(11.5,.5);
        advCtx.quadraticCurveTo(11,1.5,9.5,2);
        advCtx.lineTo(-1.5,2);
        advCtx.lineTo(-1.5,.5);
        advCtx.lineTo(-2,.5);
        advCtx.lineTo(-2,0);

        advCtx.fill();
        advCtx.stroke();
        
    }
    
    getPositions(){
        
        var lenShip;
        var pos = [];
        
        switch(this.type){
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
        
        if(this.rotation){
            for(var i=0;i<lenShip;i++){
                var p = {x: this.x, y: this.y+i};
                pos.push(p);
            } 
        } else {
            for(var i=0;i<lenShip;i++){
                var p = {x: this.x+i, y: this.y};
                pos.push(p);
            } 
        }
        
        return pos;
    }
    
    equal(ship){
        
        if(this.x != ship.x) return false;
        if(this.y != ship.y) return false;
        if(this.type != ship.type) return false;
        if(this.rotation != ship.rotation) return false;
        
        return true;
        
    }
    
}