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
        this.damage = [];
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
    
    addDamage(x,y){
        
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
            
            Damage.draw(advCtx);
            
        } else {
            
        }     
        
    }
    
    drawSubmarine(){
        
        if(hitboxes){
            advCtx.begin(2,hitboxColor);
            advCtx.rect(-2.5,-2.5,15,5);
            advCtx.stroke();
        }

        Sh_ips.drawSubmarine(advCtx);
        
    }
    
    drawCarrier(){
        
        if(hitboxes){
            advCtx.begin(2,hitboxColor);
            advCtx.rect(-2.5,-2.5,30,5);
            advCtx.stroke();
        }
        
        Sh_ips.drawCarrier(advCtx);
        
    }
                
    drawBattleship(){
        
        if(hitboxes){
            advCtx.begin(2,hitboxColor);
            advCtx.rect(-2.5,-2.5,20,5);
            advCtx.stroke();
        }
        
        Sh_ips.drawBattleship(advCtx);

        advCtx.fill();
        advCtx.stroke();
        
    }
    
    drawPatrolBoat(){
        
        if(hitboxes){
            advCtx.begin(2,hitboxColor);
            advCtx.rect(-2.5,-2.5,10,5);
            advCtx.stroke();
        }
        
        Sh_ips.drawPatrolBoat(advCtx);
        
    }
    
    drawDestroyer(){
        
        if(hitboxes){
            advCtx.begin(2,hitboxColor);
            advCtx.rect(-2.5,-2.5,15,5);
            advCtx.stroke();
        }
        
        Sh_ips.drawDestroyer(advCtx);
        
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