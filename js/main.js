var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game',
        {preload: preload, create: create, update: update});

var player;
var cursors;
var marilyn;
var score = 0;

function getRandomPosX() {
    var world = new Phaser.World(game);
    return Math.floor(Math.random() * world._width);
}

function getRandomPosY() {
    var world = new Phaser.World(game);
    return Math.floor(Math.random() * world._height);
}

function saveMarilyn(player, marilyn) {
    marilyn.reset(getRandomPosX(), getRandomPosY());
}

function preload() {
    game.load.image('marylin', 'img/marylin.png');
    game.load.spritesheet('player', 'img/player.png', 57.5, 75);
}

function create() {
    game.add.text(220, 300, "Hollywood Bld OF DRUGS!!", {fill: 'white'}); // background
    game.physics.startSystem(Phaser.Physics.ARCADE); // starter la physique

    marilyn = game.add.sprite(getRandomPosX(), getRandomPosY(), 'marylin'); // marilyn random
    game.physics.arcade.enable(marilyn);

    cursors = game.input.keyboard.createCursorKeys(); // linker les touches

    /* setter le player... */
    player = game.add.sprite(350, 220, 'player', 1);
    game.physics.arcade.enable(player);
    player.animations.add('left', [8, 9, 10, 11], 20, true);
    player.animations.add('right', [4, 5, 6, 7], 20, true);
    player.animations.add('up', [12, 13, 14, 15], 20, true);
    player.animations.add('down', [0, 1, 2, 3], 20, true);
    player.body.collideWorldBounds = true;
}

function update() {
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -350;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 350;

        player.animations.play('right');
    }
    else if (cursors.up.isDown)
    {
        //  Move up
        player.body.velocity.y = -350;

        player.animations.play('up');
    }
    else if (cursors.down.isDown)
    {
        //  Move down
        player.body.velocity.y = 350;

        player.animations.play('down');
    }
    else
    {
        //  Stand still
        player.animations.stop();
    }
    game.physics.arcade.overlap(player, marilyn, saveMarilyn, null, this);
}
