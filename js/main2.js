
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game',
               {preload: preload, create: create, render: render});



function preload() {
    game.load.spritesheet('ball', 'img/projectile_glow_orange.png',32,32);
    game.load.spritesheet('explosion', 'img/explosion.png',64,64);

}


function explosion() {

    //balls = game.add.group();
    //balls.enableBody = true; 

    exp = game.add.sprite(395,295, 'explosion');
    exp.anchor.setTo(0.5,0.5);
    exp.animations.add('explosion',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],15,false);
    exp.play('explosion');
    exp.speed = 600;


    for (var i = 0; i < 20; i++) {
        var ball = balls.create(400, 300,'ball');
        ball.anchor.setTo(0.5,0.5);
        ball.animations.add('powerball',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],100,true);
        ball.play('powerball');
        ball.speed = 600;

        ball.body.velocity.x = (Math.random()*(2)-1)*100;
        ball.body.velocity.y = (Math.random()*(2)-1)*100;
        ball.body.collideWorldBounds = false;

    };
}

function create() {
	
	balls = game.add.group();
    balls.enableBody = true; 

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.time.events.repeat(Phaser.Timer.SECOND*10,10,explosion, this);

   }


function render() {
    //game.debug.text("Time until event: " + game.time.events.duration.toFixed(0), 32, 32);
	
}

