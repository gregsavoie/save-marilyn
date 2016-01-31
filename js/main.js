var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game',
        {preload: preload, create: create, render: render});

var player;
var marilyn;
var cursors;
var pillGroup;
var score = 0;
var scoreText;
var isOdd = true;
var cmpt = 0
var gameIsStarted = false;
var gameIsFinished = false;
var life_2_bool = true;
var life_3_bool = true;
var life1;
var life2;
var life3;
var ballGroup;
var counter = 0;
var countdown = 0;

function putBackOpacity() {
    player.alpha = 1;
}

function removeOpacity() {
    player.alpha = 0.2;
}

function updateCounter() {

	counter++;
	countdown.setText('Time to next Supernovae: ' + (5 - counter%6));
}

function explosionMenu() {
    var exp = game.add.sprite(680, 275, 'explosion');
    exp.anchor.setTo(0.5,0.5);
    exp.animations.add('explosion', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24], 25, true);
    exp.play('explosion');
    exp.speed = 600;
}

function explosion() {
    exp = game.add.sprite(marilyn.x + 17.5, marilyn.y + 22.5, 'explosion');
    exp.anchor.setTo(0.5,0.5);
    exp.animations.add('explosion',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],15,false);
    exp.play('explosion');
    exp.speed = 600;


    for (var i = 0; i < 10; i++) {
        var ball = ballGroup.create(marilyn.x + 17.5, marilyn.y + 22.5, 'ball');
        ball.anchor.setTo(0.5,0.5);
        ball.animations.add('powerball',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],100,true);
        ball.play('powerball');
        ball.speed = 600;

        ball.body.velocity.x = (Math.random()*(2)-1)*100;
        ball.body.velocity.y = (Math.random()*(2)-1)*100;
        ball.body.collideWorldBounds = false;
    };

    marilyn.reset(getRandomPosXForMarilyn(), getRandomPosYForMarilyn());
    counter = 0;
    game.time.events.add(5000, explosion, this);
}

function startGame() {
    game.world.removeAll();
    game.add.text(260, 300, "Hollywood Boulevard", {fill: 'white'}); // background
    game.add.text(320, 330, "OF DRUGS!!", {fill: 'white'}); 
    scoreText = game.add.text(8, 8, 'score: 0', {fontSize: '18px', fill: 'white'}); // affichage du score;
    player = game.add.sprite(350, 220, 'player', 1);
    marilyn = game.add.sprite(getRandomPosXForMarilyn(), getRandomPosYForMarilyn(), 'marylin');
    life1 = game.add.sprite(780, 5, 'blue_star');
    life2 = game.add.sprite(770, 5, 'blue_star');
    life3 = game.add.sprite(760, 5, 'blue_star');
    life_3_bool = true;
    life_2_bool = true;

    pillGroup = game.add.group(); // pillGroup pour obstacles
    pillGroup.enableBody = true;

    game.physics.arcade.enable(marilyn);
    game.physics.arcade.enable(player);
    game.physics.arcade.enable(pillGroup);

    /* setter le player... */
    player.animations.add('left', [8, 9, 10, 11], 20, true);
    player.animations.add('right', [4, 5, 6, 7], 20, true);
    player.animations.add('up', [12, 13, 14, 15], 20, true);
    player.animations.add('down', [0, 1, 2, 3], 20, true);
    player.body.collideWorldBounds = true;

    gameIsStarted = true;
    gameIsFinished = false;
    score = 0;

    /* setter les explosions */
	ballGroup = game.add.group();
    ballGroup.enableBody = true; 
    game.physics.arcade.enable(ballGroup);


	countdown = game.add.text(600, 20, 'Time to next Supernovae: 5', { fontSize: "18px", fill: "white"});
    countdown.anchor.setTo(0.5, 0.5);


    game.time.events.add(5000, explosion, this);
    game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);
}

function youDieded() {
    game.world.removeAll();
    game.time.events.removeAll();
    game.add.text(100, 150, 'Score: ' + score, {fill: 'white'});
    game.add.text(100, 200, 'You failed!', {fontSize: '26px', fill: 'white'});
    game.add.text(100, 250, 'Marilyn ODed... AGAIN!', {fontSize: '20px', fill: 'white'});
    game.add.sprite(400, 100, 'marilyn_fin');

    game.add.text(100, 500, 'Press up arrow to play again!', {fontSize: '14px', fill: 'white'});
    cursors = game.input.keyboard.createCursorKeys(); // linker les touches
    gameIsFinished = true;
}

function drugIntake(player, obj) {
    obj.kill();
    game.time.events.add(0, removeOpacity, this);
    game.time.events.add(100, putBackOpacity, this);
    game.time.events.add(150, removeOpacity, this);
    game.time.events.add(200, putBackOpacity, this);
    if (life_3_bool)
    {
        life_3_bool = false;
        life3.visible = false;
    }
    else if (life_2_bool)
    {
        life_2_bool = false;
        life2.visible = false;
    }
    else
    {
        youDieded();
    }
}

function createPill() {
    var pill;
    if(cmpt % 9 == 0)
    {
        if(isOdd)
        {
            if(Math.random() < 0.50)
            {
                pill = pillGroup.create(getRandomPosX(), game.world._height, 'pill');
                pill.body.velocity.y = -300;
            }
            else
            {
                pill = pillGroup.create(getRandomPosX(), 0, 'pill');
                pill.body.velocity.y = 300;
            }
        }
        else
        {
            if(Math.random() < 0.50)
            {
                pill = pillGroup.create(game.world._width, getRandomPosY(), 'pill');
                pill.body.velocity.x = -300;
            }
            else
            {
                pill = pillGroup.create(0, getRandomPosY(), 'pill');
                pill.body.velocity.x = 300;
            }
        }
        pill.body.collideWorldBounds = false;
    }
}

function getRandomPosXForMarilyn() {
    var world = new Phaser.World(game);
    var posX = Math.floor(Math.random() * world._width);
    if (posX + 35 > world._width)
    {
        posX = world._width - 35;
    }
    return posX;
}

function getRandomPosYForMarilyn() {
    var world = new Phaser.World(game);
    var posY = Math.floor(Math.random() * world._height);
    if (posY + 45 > world._height)
    {
        posY = world._height - 45;
    }
    return posY;
}

function getRandomPosX() {
    var world = new Phaser.World(game);
    return Math.floor(Math.random() * world._width);
}

function getRandomPosY() {
    var world = new Phaser.World(game);
    return Math.floor(Math.random() * world._height);
}

function saveMarilyn(player, marilyn) {
    marilyn.reset(getRandomPosXForMarilyn(), getRandomPosYForMarilyn());
    score += 20;
    scoreText.text = 'score: ' + score;
    game.time.events.removeAll();
    counter = 0;
    game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);
    game.time.events.add(5000, explosion, this);
}

function preload() {
    game.load.image('marylin', 'img/marylin.png');
    game.load.image('pill', 'img/pill.png');
    game.load.image('marilyn_fin', 'img/marilyn_fin.png');
    game.load.image('blue_star', 'img/blue_star.png');
    game.load.spritesheet('player', 'img/player.png', 57.5, 75);
    game.load.spritesheet('ball', 'img/projectile_glow_orange.png',32,32);
    game.load.spritesheet('explosion', 'img/explosion.png',64,64);
}

function create() {
    game.add.text(260, 50, "Save Marilyn!", {fontSize: '40px', fill: 'white'}); 
    game.add.text(50, 150, 'Save Marilyn from ODing', {fontSize: '18px', fill: 'white'});
    game.add.text(50, 180, 'Dodge the drugs so you don\'t become an addict', {fontSize: '18px', fill: 'white'});
    game.add.text(50, 210, 'But be careful, the more you run, the more drug there is', {fontSize: '18px', fill: 'white'});
    game.add.text(50, 240, 'You won\'t tolerate more than 3 doses', {fontSize: '18px', fill: 'white'});
    game.add.text(50, 270, 'Don\'t take too much time, otherwise marilyn will explode!', {fontSize: '18px', fill: 'white'});
    game.add.text(550, 275, '(Hollywood style...)', {fontSize: '10px', fill: 'white'});
    game.time.events.repeat(Phaser.Timer.SECOND, 10, explosionMenu, this);
    game.add.text(260, 370, 'GOOD LUCK!', {fontSize: '40px', fill: 'white'});
    game.add.text(305, 540, 'Press up arrow to start', {fontSize: '14px', fill: 'white'});
    player = game.add.sprite(350, 450, 'player', 1);
    marilyn = game.add.sprite(300, 130, 'marylin');
    game.add.sprite(480, 185, 'pill');
    game.add.sprite(545, 215, 'pill');
    game.add.sprite(370, 245, 'blue_star');
    game.add.sprite(380, 245, 'blue_star');
    game.add.sprite(390, 245, 'blue_star');

    game.physics.startSystem(Phaser.Physics.ARCADE); // starter la physique
    game.physics.arcade.enable(marilyn);
    game.physics.arcade.enable(player);

    cursors = game.input.keyboard.createCursorKeys(); // linker les touches

}

function render() {
    isOdd = !isOdd;
    cmpt++;
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
    if (cursors.left.isDown)
    {
        if (gameIsStarted)
        {
            //  Move to the left
            player.body.velocity.x = -350;

            player.animations.play('left');
            createPill();
        }
    }
    else if (cursors.right.isDown)
    {
        if (gameIsStarted)
        {
            //  Move to the right
            player.body.velocity.x = 350;

            player.animations.play('right');
            createPill();
        }
    }
    else if (cursors.up.isDown)
    {
        if (gameIsStarted && !gameIsFinished)
        {
            //  Move up
            player.body.velocity.y = -350;

            player.animations.play('up');
            createPill();
        }
        else
        {
            game.time.events.removeAll();
            startGame();
        }
        if (gameIsFinished)
        {
            startGame();
        }
    }
    else if (cursors.down.isDown)
    {
        if (gameIsStarted)
        {
            //  Move down
            player.body.velocity.y = 350;

            player.animations.play('down');
            createPill();
        }
    }
    else
    {
        //  Stand still
        player.animations.stop();
    }
    game.physics.arcade.overlap(player, marilyn, saveMarilyn, null, this);
    game.physics.arcade.overlap(player, pillGroup, drugIntake, null, this);
    game.physics.arcade.overlap(player, ballGroup, drugIntake, null, this);
}
