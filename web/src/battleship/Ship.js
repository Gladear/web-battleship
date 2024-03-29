import {
    advCtx,
    t,
    gridCaseLength,
    gridCaseHeight,
    Sh_ips,
    Damage,
} from "./Game.js"

export class Ship {
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
        this.damageCount = 0;
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

    addDamage(i){
        this.damageCount++;
        this.damage.push(i);
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
            switch(parseInt(this.type,10)){
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

            var ship_ = this;

            this.damage.forEach(function(d){

                var xx;
                var yy;

                switch(ship_.rotation){
                    case 0:
                        xx = gridCaseLength*(ship_.x+d+.5)+offsetSwimX;
                        yy = gridCaseHeight*(ship_.y+.5)+offsetSwimY;
                        break;
                    case 1:
                        xx = gridCaseLength*(ship_.x+.5)+offsetSwimX;
                        yy = gridCaseHeight*(ship_.y+d+.5)+offsetSwimY;
                        break;
                }

                advCtx.setParams(xx,yy,gridCaseLength/5*rot2,rot);
                Damage.draw(advCtx);
            });


        } else {

            var offsetSwimX = Math.cos(this.offsetSwimDirection*(t+this.offsetSwim)/(1+this.offsetSwimSpeed))*(1+this.offsetSwimWidth);
            var offsetSwimY = Math.sin(this.offsetSwimDirection*(t+this.offsetSwim)/(1+this.offsetSwimSpeed)-.5)*(1+this.offsetSwimWidth);

            this.damage.forEach(function(d){

                var xx;
                var yy;

                xx = gridCaseLength*(d.x+.5)+offsetSwimX;
                yy = gridCaseHeight*(d.y+.5)+offsetSwimY;

                advCtx.setParams(xx,yy,gridCaseLength/5,0);
                Damage.draw(advCtx);
            });

        }

    }

    drawSubmarine(){

        Sh_ips.drawSubmarine(advCtx);

    }

    drawCarrier(){

        Sh_ips.drawCarrier(advCtx);

    }

    drawBattleship(){

        Sh_ips.drawBattleship(advCtx);

        advCtx.fill();
        advCtx.stroke();

    }

    drawPatrolBoat(){

        Sh_ips.drawPatrolBoat(advCtx);

    }

    drawDestroyer(){

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
