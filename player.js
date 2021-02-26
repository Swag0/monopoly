class Player{
    id;
    position;
    money;

    constructor(id = 0, position = 0, money = 15) {
        this.id = id;
        this.position = position;
        this.money = money;
    }
}

module.exports = Player;