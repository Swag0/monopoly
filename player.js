class Player{
    id;
    position;
    money;

    constructor(id = 0, position = 0) {
        this.id = id;
        this.position = position;
        this.money = 55;
    }
}

module.exports = Player;