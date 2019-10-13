var expColor1 = "#414141";
var expColor2 = "#e34040";
var expColor3 = "#ff1e1e";

class DamageNotGame {
    
    constructor() {
        
    }
    
    draw(pctx){           
        
        pctx.begin(2,expColor2,expColor2);
        
        pctx.moveTo(0,-1);
        pctx.lineTo(1,-2);
        pctx.lineTo(1.25,.5);
        pctx.lineTo(1.75,1.5);
        pctx.lineTo(1,1.5);
        pctx.lineTo(0,1.75);
        pctx.lineTo(0,1);
        pctx.lineTo(-2,2);
        pctx.lineTo(-1,0);
        pctx.lineTo(-.5,-1.5);
        pctx.lineTo(0,-1);
        
        pctx.fill();
        pctx.stroke();
        
    }  
    
}