// Obstacle = function(game) {

// 	Phaser.Sprite.call(this, game, game.world.randomX, game.world.randomY, 'star');
// 	this.body.velocity.x = (Math.random()*(1)-0.5)*100;
// 	this.body.velocity.y = (Math.random()*(0.5)+0.5)*100;
// 	game.add.existing(this)
// }

// Obstacle.prototype = Object.create(Phaser.Sprite.prototype);
// Obstacle.prototype.constructor = Obstacle;
// Obstacle.prototype.update = function(first_argument) {
// };

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game',
               {preload: preload, create: create, update: update});

function preload() {
    game.load.image('star', 'img/blue_star.png');
}

function create() {
    // game.add.text(340, 300, "Hello, world!", {fill: 'white'});
    game.physics.startSystem(Phaser.Physics.ARCADE);
    var stars = game.add.group();
    game.physics.arcade.enable(stars);    // On démarre le système physique
    stars.enableBody = true; 
    
    
    // for (var i = 0; i < 20; i++) {
    // 	var star = stars.create(Math.random()*800, 0,'star');
    // 	star.body.velocity.x = (Math.random()*(1)-0.5)*100;
    // 	star.body.velocity.y = (Math.random()*(0.5)+0.5)*100;
    // 	star.body.collideWorldBounds = false;
    // 	var star = stars.create(0, Math.random()*600,'star');
    // 	star.body.velocity.x = (Math.random()*(0.5)+0.5)*100;
    // 	star.body.velocity.y = (Math.random()*(1)-0.5)*100;
    // 	star.body.collideWorldBounds = false;
    // 	var star = stars.create(800, Math.random()*600,'star');
    // 	star.body.velocity.x = (Math.random()*(0.5)-1)*100;
    // 	star.body.velocity.y = (Math.random()*(1)-0.5)*100;
    // 	star.body.collideWorldBounds = false;
    // 	var star = stars.create(Math.random()*800,600,'star');
    // 	star.body.velocity.x = (Math.random()*(1)-0.5)*100;
    // 	star.body.velocity.y = (Math.random()*(0.5)-1)*100;
    // 	star.body.collideWorldBounds = false;
    // };

    for (var i = 0; i < 30; i++) {
    	var star = stars.create(400, 300,'star');
    	star.body.velocity.x = (Math.random()*(2)-1)*100;
    	star.body.velocity.y = (Math.random()*(2)-1)*100;
    	star.body.collideWorldBounds = false;

    };

    // for (var i = 0; i < 20; i++) {
    	
    // };

    // for (var i = 0; i < 20; i++) {
    	
    // };

    // for (var i = 0; i < 20; i++) {
    	
    // };

    // for (var i = 0; i < 12; i++) {
    // 	var star = stars.create(i*50, 0,'star');
    // 	//star.body.velocity.x = (Math.random()*(1)-0.5)*100;
    // 	star.body.velocity.y = 100 //(Math.random()*(0.5)+0.5)*100;
    // };

    //star.body.collideWorldBounds = false; // Collision avec les bords du canvas
}

function update() {

	
}

