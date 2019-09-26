class Player {
    constructor(num,current) {
        this.num = num;
        this.current = current;
        this.ships = [];
    }
 
    getNum(){
        return this.num;
    }
    
    getCurrent(){
        return this.current;
    }
    
    getShips(){
        return this.ships;
    }
    
    clearShips(){
        this.ships = [];
    }
    
    addShip(ship){
        this.ships.push(ship);
    }
    
    drawShips(own){
        this.ships.forEach( function(ship){
            ship.draw(own);
        });
    }
    
}

