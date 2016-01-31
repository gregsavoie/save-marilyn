
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game',
               {preload: preload, create: create, render: render});

var counter = 0;
var text = 0;

function preload() {
    game.load.spritesheet('ball', 'img/projectile_glow_orange.png',32,32);
    game.load.spritesheet('explosion', 'img/explosion.png',64,64);

}


function explosion() {

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

	text = game.add.text(120, 32, 'Time to next Supernovae: 10', { font: "16px Arial", fill: "#ffffff"});
    text.anchor.setTo(0.5, 0.5);


    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.time.events.repeat(Phaser.Timer.SECOND*10,10,explosion, this);
    game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);

   }

function updateCounter() {

	counter++;
	text.setText('Time to next Supernovae: ' + (10 - counter%11));
}


function render() {	
}

