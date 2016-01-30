var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game',
               {preload: preload, create: create, update: update});

function preload() {
}

function create() {
    game.add.text(340, 300, "Hello, world!", {fill: 'white'});
}

function update() {
}
