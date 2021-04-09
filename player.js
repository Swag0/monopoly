class Player{
    id;
    boardPosition;
    money;

    constructor(id = 0, boardPosition = 0) {
        this.id = id;
        this.boardPosition = boardPosition;
        this.money = 55;
    }
}

module.exports = Player;