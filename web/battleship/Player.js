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
    
    removeShip(ship){
        
        var filtered = this.ships.filter(function(value, index, arr){

            return !ship.equal(value);

        });
        
        this.ships = filtered;
        
    }
    
    drawShips(own){
        this.ships.forEach( function(ship){
            ship.draw(own);
        });
    }
    
    getShipsPos(){
        var shipsPos = [];
        this.ships.forEach( function(ship){
            ship.getPositions().forEach( function(pos){
                shipsPos.push(pos);
            });
        });
        return shipsPos;
    }
    
}

