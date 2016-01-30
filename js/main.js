var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game',
               {preload: preload, create: create, update: update});

function preload() {
    game.load.image('blue_star', 'img/blue_star.png');
}

function create() {
    game.add.text(340, 300, "Hello, world!", {fill: 'white'});
    var blue_star = game.add.sprite(0,200, 'blue_star');
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.enable(blue_star);    // On démarre le système physique
    blue_star.enableBody = true;              // Le blue_star est géré dans le système
    blue_star.body.velocity.x = 200;          // La vitesse horizontale du nuage
    blue_star.body.bounce.x = 1.0;            // La collision est parfaitement élastique
    blue_star.body.collideWorldBounds = false; // Collision avec les bords du canvas
}

function update() {
}
