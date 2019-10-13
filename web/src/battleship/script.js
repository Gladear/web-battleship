var canvas = document.getElementById("battleship");
var context = canvas.getContext("2d");

class AdvancedCtx {
    constructor(ctx, f) {
        this.ctx = ctx;
        this.f = f;
        this.offsetX = 0;
        this.offsetY = 0;
    }
    
    getCtx() {
        return this.ctx;
    }
    
    setCtx(ctx) {
        this.ctx = ctx;
    }
    
    getF() {
        return this.f;
    }
    
    setF(f) {
        this.f = f;
    }
    
    getOffsetX() {
        return this.offsetX;
    }
    
    setOffsetX(offsetX) {
        this.offsetX = offsetX;
    }
    
    getOffsetY() {
        return this.offsetY;
    }
    
    setOffsetY(offsetY) {
        this.offsetY = offsetY;
    }
    
    moveTo(x,y) {
        this.ctx.moveTo(x*this.f+this.offsetX,y*this.f+this.offsetY);
    }
    
    lineTo(x,y) {
        this.ctx.lineTo(x*this.f+this.offsetX,y*this.f+this.offsetY);
    }
    
    quadraticCurveTo(x1,y1,x2,y2){
        this.ctx.quadraticCurveTo(x1*this.f+this.offsetX,y1*this.f+this.offsetY,x2*this.f+this.offsetX,y2*this.f+this.offsetY);
    }
    
    bezierCurveTo(x1,y1,x2,y2,x3,y3){
        this.ctx.bezierCurveTo(x1*this.f+this.offsetX,y1*this.f+this.offsetY,x2*this.f+this.offsetX,y2*this.f+this.offsetY,x3*this.f+this.offsetX,y3*this.f+this.offsetY);
    }
    
    begin(w,c){
        this.ctx.beginPath();
        this.ctx.lineWidth = w;
        this.ctx.strokeStyle = c; 
    }
    
    stroke(){
        this.ctx.stroke();
    }
}

function drawBackground(ctx){
    ctx.fillStyle = "#000000";
    ctx.fillRect(0,0,600,400);
}

function drawSubmarine(ctx){
    
    ctx.begin(2,"#ff1e1e");
    
    ctx.moveTo(-2.5,-2.5);
    ctx.lineTo(12.5,-2.5);
    ctx.lineTo(12.5,2.5);
    ctx.lineTo(-2.5,2.5);
    ctx.lineTo(-2.5,-2.5);
    
    ctx.stroke();
    
    ctx.begin(2,"#cbcbcb");
    
    ctx.moveTo(6.5,-1.5);
    ctx.lineTo(6.5,-3);
    ctx.lineTo(7.5,-3);
    ctx.lineTo(7.5,-2.5);
    ctx.lineTo(8.5,-2.5);
    ctx.lineTo(8.5,-1.5);
    
    ctx.stroke();
    
    ctx.begin(2,"#cbcbcb");
    
    ctx.moveTo(6.75,-3);
    ctx.lineTo(6.75,-3.5);
    
    ctx.stroke();
    
    ctx.begin(2,"#cbcbcb");
    
    ctx.moveTo(-0.25,-0.25);
    ctx.quadraticCurveTo(0.2,0,0.5,-0.5);
    ctx.quadraticCurveTo(0.75,-1,5.5,-1.5)
    ctx.lineTo(9.5,-1.5);
    ctx.bezierCurveTo(11,-0.5,11,0.5,9.5,1.5);
    ctx.lineTo(5.5,1.5);
    ctx.quadraticCurveTo(0.75,1,0.5,0.5);
    ctx.quadraticCurveTo(0.2,0,-0.25,0.25);
    ctx.quadraticCurveTo(-0.25,0.75,-0.5,1);
    ctx.lineTo(-0.5,0.25);
    ctx.bezierCurveTo(-0.75,0.2,-0.75,-0.2,-0.5,-0.25);
    ctx.lineTo(-0.5,-1);
    ctx.quadraticCurveTo(-0.25,-0.75,-0.25,-0.25);
    
    ctx.stroke();
}

advContext = new AdvancedCtx(context,20);
advContext.setOffsetX(100);
advContext.setOffsetY(100);

drawBackground(context);
drawSubmarine(advContext);
