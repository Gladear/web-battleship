export class BoatDefinition{

    constructor() {
    }

    getBoat(t){

        var name;
        var len;
        var sn;

        switch(t){
            case 0:
                name = "Submarine";
                len = 3;
                sn = "subC";
                break;
            case 1:
                name = "Carrier";
                len = 6;
                sn = "carC";
                break;
            case 2:
                name = "Battleship";
                len = 4;
                sn = "batC";
                break;
            case 3:
                name = "Patrol Boat";
                len = 2;
                sn = "patC";
                break;
            case 4:
                name = "Cruiser";
                len = 3;
                sn = "cruC";
                break;
        }

        return {n:name,l:len,sn:sn};

    }
}
