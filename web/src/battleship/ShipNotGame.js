var hitboxes = false;
var boatStrokeColor = "#414141";
var boatFillColor = "#b1aeae";
var hitboxColor = "#ff1e1e";

class ShipNotGame {
    constructor() {
    }
    
    draw(type,rotation,x,y,l,pctx){           

        pctx.setParams(x,y,l,rotation);
        switch(type){
            case 0: //Submarine
                this.drawSubmarine(pctx);
                break;
            case 1: //Carrier
                this.drawCarrier(pctx);
                break;
            case 2: //Battleship
                this.drawBattleship(pctx);
                break;
            case 3: //Patrol Boat
                this.drawPatrolBoat(pctx);
                break;
            case 4: //Destroyer
                this.drawDestroyer(pctx);
                break;
        }
        
    }
    
    drawSubmarine(pctx){
        
        if(hitboxes){
            pctx.begin(2,hitboxColor);
            pctx.rect(-2.5,-2.5,15,5);
            pctx.stroke();
        }

        pctx.begin(2,boatStrokeColor,"#fecc33");

        pctx.moveTo(6.5,-1.5);
        pctx.lineTo(6.5,-3);
        pctx.lineTo(7.5,-3);
        pctx.lineTo(7.5,-2.5);
        pctx.lineTo(8.5,-2.5);
        pctx.lineTo(8.5,-1.5);

        pctx.fill();
        pctx.stroke();

        pctx.begin(2,boatStrokeColor,"#fecc33");

        pctx.moveTo(-0.25,-0.25);
        pctx.quadraticCurveTo(0.2,0,0.5,-0.5);
        pctx.quadraticCurveTo(0.75,-1,5.5,-1.5)
        pctx.lineTo(9.5,-1.5);
        pctx.bezierCurveTo(11,-0.5,11,0.5,9.5,1.5);
        pctx.lineTo(5.5,1.5);
        pctx.quadraticCurveTo(0.75,1,0.5,0.5);
        pctx.quadraticCurveTo(0.2,0,-0.25,0.25);
        pctx.quadraticCurveTo(-0.25,0.75,-0.5,1);
        pctx.lineTo(-0.5,0.25);
        pctx.bezierCurveTo(-0.75,0.2,-0.75,-0.2,-0.5,-0.25);
        pctx.lineTo(-0.5,-1);
        pctx.quadraticCurveTo(-0.25,-0.75,-0.25,-0.25);

        pctx.fill();
        pctx.stroke();
        
        pctx.begin(1,boatStrokeColor,boatFillColor);

        pctx.moveTo(-0.25,0.25);
        pctx.quadraticCurveTo(-0.25,0.75,-0.5,1);
        pctx.lineTo(-0.5,-1);
        pctx.quadraticCurveTo(-0.25,-0.75,-0.25,-0.25);
        pctx.lineTo(-0.25,0.25);

        pctx.fill();
        pctx.stroke();
        
        pctx.begin(1,boatStrokeColor,"#5cbbde");

        pctx.moveTo(-0.25,0.25);
        pctx.quadraticCurveTo(-0.25,0.75,-0.5,1);
        pctx.lineTo(-0.5,-1);
        pctx.quadraticCurveTo(-0.25,-0.75,-0.25,-0.25);
        pctx.lineTo(-0.25,0.25);

        pctx.fill();
        pctx.stroke();
    }
    
    drawCarrier(pctx){
        
        if(hitboxes){
            pctx.begin(2,hitboxColor);
            pctx.rect(-2.5,-2.5,30,5);
            pctx.stroke();
        }
        
        pctx.begin(2,"#000000","#000000");

        pctx.moveTo(2,1.75);
        pctx.lineTo(.5,1.75);
        pctx.lineTo(.5,1.90);
        pctx.moveTo(.5,1.75);
        pctx.lineTo(.5,1.60);

        pctx.stroke();
        
        pctx.begin(2,boatStrokeColor,boatFillColor);

        pctx.moveTo(.5,-.5);
        pctx.lineTo(3.5,-.5);
        pctx.lineTo(3.5,-2.5);
        pctx.lineTo(2,-2.5);
        pctx.lineTo(2,-3.5);
        pctx.lineTo(1.5,-3.5);
        pctx.lineTo(1.5,-2.5);
        pctx.lineTo(.5,-2.5);
        pctx.lineTo(.5,-.5);

        pctx.fill();
        pctx.stroke();
        
        pctx.begin(2,boatStrokeColor,boatFillColor);

        pctx.moveTo(-1.5,-.5);
        pctx.lineTo(26.5,-.5);
        pctx.lineTo(26.5,0);
        pctx.quadraticCurveTo(26,0,25.5,1.5);
        pctx.lineTo(26,1.5);
        pctx.bezierCurveTo(26.5,1.5,26.5,2,26,2);
        pctx.lineTo(1.5,2);
        pctx.lineTo(1,1.5);
        pctx.lineTo(0,1.5);
        pctx.lineTo(0,2);
        pctx.lineTo(-.5,2);
        pctx.lineTo(-.5,1.5);
        pctx.lineTo(-1.25,1.5);
        pctx.lineTo(-1.5,.5);
        pctx.lineTo(-1.5,-.5);

        pctx.fill();
        pctx.stroke();
        
    }
                
    drawBattleship(pctx){
        
        if(hitboxes){
            pctx.begin(2,hitboxColor);
            pctx.rect(-2.5,-2.5,20,5);
            pctx.stroke();
        }
        
        pctx.begin(2,boatStrokeColor,boatFillColor);

        pctx.moveTo(1.5,-.5);
        pctx.lineTo(1.5,-1.5);
        pctx.lineTo(2.5,-1.5);
        pctx.lineTo(2.5,-1);
        pctx.lineTo(4.5,-1);
        pctx.lineTo(4.5,-1.5);
        pctx.lineTo(6.5,-1.5);
        pctx.lineTo(6.5,-.5);
        pctx.lineTo(7,-.5);
        pctx.lineTo(7,-1);
        pctx.lineTo(7.5,-1);
        pctx.lineTo(7.5,-1.5);
        pctx.lineTo(8.5,-1.5);
        pctx.lineTo(8.5,-.5);
        pctx.lineTo(9.5,-.5);
        pctx.lineTo(9.5,-2);
        pctx.lineTo(10.5,-2);
        pctx.lineTo(10.5,-3.5);
        pctx.lineTo(11,-3.5);
        pctx.lineTo(11,-2);
        pctx.lineTo(12.5,-2);
        pctx.lineTo(14.5,-.5);
        pctx.lineTo(1.5,-.5);

        pctx.fill();
        pctx.stroke();
        
        pctx.begin(2,boatStrokeColor,boatFillColor);

        pctx.moveTo(-1.5,-.5);
        pctx.lineTo(9.5,-.5);
        pctx.quadraticCurveTo(15.5,-.75,16.5,-1);
        pctx.quadraticCurveTo(15,1,15.5,1.5);
        pctx.lineTo(10.5,1.5);
        pctx.quadraticCurveTo(10.75,1.90,11,2);
        pctx.bezierCurveTo(11,2.25,9,2.25,9,2);
        pctx.quadraticCurveTo(8.75,1.90,8.5,1.5);
        pctx.lineTo(5.5,1.5);
        pctx.quadraticCurveTo(2,1.5,1,1);
        pctx.lineTo(.5,1.5);
        pctx.lineTo(0,1.5);
        pctx.lineTo(-.5,1);
        pctx.lineTo(-1,1);
        pctx.quadraticCurveTo(-1,0,-1.5,-.5);

        pctx.fill();
        pctx.stroke();
        
    }
    
    drawPatrolBoat(pctx){
        
        if(hitboxes){
            pctx.begin(2,hitboxColor);
            pctx.rect(-2.5,-2.5,10,5);
            pctx.stroke();
        }
        
        pctx.begin(2,boatStrokeColor,boatFillColor);

        pctx.moveTo(1.5,0);
        pctx.lineTo(1.5,-2.25);
        pctx.lineTo(2.25,-2.25);
        pctx.lineTo(3.25,-1.5);
        pctx.lineTo(4.5,-1.5);
        pctx.lineTo(6,0);
        pctx.lineTo(1.5,0);

        pctx.fill();
        pctx.stroke();
        
        pctx.begin(2,boatStrokeColor,boatFillColor);

        pctx.moveTo(-2.5,0);
        pctx.lineTo(-2.5,.5);
        pctx.lineTo(-1.5,.5);
        pctx.lineTo(-1.5,1.5);
        pctx.lineTo(5.5,1.5);
        pctx.quadraticCurveTo(7.5,1,7.5,-.5);
        pctx.quadraticCurveTo(6.5,0,3.5,0);
        pctx.lineTo(-2.5,0);

        pctx.fill();
        pctx.stroke();
        
    }
    
    drawDestroyer(pctx){
        
        if(hitboxes){
            pctx.begin(2,hitboxColor);
            pctx.rect(-2.5,-2.5,15,5);
            pctx.stroke();
        }
        
        pctx.begin(2,boatStrokeColor,boatFillColor);

        pctx.moveTo(-.5,0);
        pctx.lineTo(-.5,-.5);
        pctx.lineTo(2.5,-.5);
        pctx.lineTo(2.5,0);
        pctx.lineTo(3.5,0);
        pctx.lineTo(3.5,-1);
        pctx.lineTo(8.5,-1);
        pctx.lineTo(8.5,-2);
        pctx.lineTo(10.5,-2);
        pctx.lineTo(10.5,-1.5);
        pctx.lineTo(11.5,-1.5);
        pctx.lineTo(11.5,0);
        pctx.lineTo(-.5,0);

        pctx.fill();
        pctx.stroke();
        
        pctx.begin(2,boatStrokeColor,boatFillColor);

        pctx.moveTo(.5,0);
        pctx.lineTo(0,-1.5);
        pctx.lineTo(1,-1.75);
        pctx.lineTo(1.5,0);
        pctx.lineTo(4,0);
        pctx.lineTo(3.5,-1.5);
        pctx.lineTo(4.5,-1.75);
        pctx.lineTo(5,0);
        pctx.lineTo(.5,0);

        pctx.fill();
        pctx.stroke();
        
        pctx.begin(2,boatStrokeColor,boatFillColor);

        pctx.moveTo(-2,0);
        pctx.lineTo(7.5,0);
        pctx.quadraticCurveTo(8,0,8.5,-.5);
        pctx.lineTo(12,-.5);
        pctx.lineTo(11.5,.5);
        pctx.quadraticCurveTo(11,1.5,9.5,2);
        pctx.lineTo(-1.5,2);
        pctx.lineTo(-1.5,.5);
        pctx.lineTo(-2,.5);
        pctx.lineTo(-2,0);

        pctx.fill();
        pctx.stroke();
        
    }
    
}