class Place {
    id;
    cost;
    owner;
    constructor(id = 0, cost = 0, owner = -1) {
        this.id = id;
        this.cost = cost;
        this.owner = owner;
        
        /*
        var RED = '🔴'; //main / p1
        var BLUE = '🔵'; //p2
        var GREEN = '🟢'; //p3
        var YELLOW = '🟡'; //p4
        var ORANGE = '🟠'; //p5
        var PURPLE = '🟣'; //p6
        var MULTIPLE = '⏺️';
        */
    }
}

module.exports = Place;