var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

	function preload() {
		game.load.image('background', './assets/background.png');    
		game.load.image('apple','./assets/apple.png');
		game.load.image('death', './assets/dead.png');
		game.load.image('slow','./assets/slow.png');
		game.load.image('bonus','./assets/bonus.png');
		game.load.image('flyApple','./assets/flyApple.png');
		game.load.image('explotion','./assets/explotion.png');
		game.load.image('heart1','./assets/heart1.png');
		game.load.image('heart2','./assets/heart2.png');
		game.load.image('heart3','./assets/heart3.png');
	    game.load.audio("lifeExplosion", "./audio/explosion.mp3");
   		game.load.audio("deathExplosion", "./audio/boom.mp3");
		game.load.spritesheet('sprites', './assets/sprites.png', 85, 121, 5);

	}


	//Objects
	var player;
	var apples;
	var deaths;
	var slows;
	var bonuss;
	var flyss;
	var allowFlight = false;
	//Speed

	var playerSpeed = 500;
	var appleSpeed = 120;
	var deathAppleSpeed = 90;
	var slowAppleSpeed = 140;
	var bonusAppleSpeed = 200;
	var flyAppleSpeed = 250;

	//Timers
	var AppleTimer = 500;
	var deathAppleTimer = 3000;
	var slowAppleTimer = 3000;
	var bonusAppleTimer = 4000;
	var flyTimer = 10000;
	var flyAppleTimer = 15000;

	//Score
	var score = 0;
	var scoreText;
	var text;
	var totalScore = 200;

 	//Timer variables
	var appleTimer;
	var deathTimer;
	var slowTimer;
	var bonusTimer;
	var flyTimer;

	var p = 1;
	var heart1, heart2, heart3;
	var lives = 3;
	var alive = true;
	var count;



	function create() {
	
		game.physics.startSystem(Phaser.Physics.ARCADE);


		game.add.sprite(0, 0, 'background');		
		
		player  = game.add.sprite(30, game.world.height - 130, 'sprites', 2);
		heart1 = game.add.sprite(680, 20, 'heart1');
		heart2 = game.add.sprite(720, 20, 'heart2');
		heart3 = game.add.sprite(760, 20, 'heart3');
		player.animations.add('eatLeft', [2, 1 , 0, 2], 10, true);
		player.animations.add('eatRight', [2, 3 , 4, 2], 10, true);
		
		 //  We need to enable physics on the player
		game.physics.arcade.enable(player);

		player.body.collideWorldBounds = true;


		//Explosion Sounds 
	    lifeExplosion = game.add.audio('lifeExplosion');
    	deathExplosion = game.add.audio('deathExplosion');

		scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });


		apples = game.add.group();
		deaths = game.add.group();
		slows = game.add.group();
		bonuss = game.add.group();
		flyss = game.add.group();

		// Enabling Physics
		apples.enableBody = true;
		deaths.enableBody = true;
		slows.enableBody = true;
		bonuss.enableBody = true;
		flyss.enableBody = true;

		//Setting timer variables
		if(alive)
		{	
			appleTimer = setInterval(createApple, AppleTimer);
			deathTimer = setInterval(createDeathApple, deathAppleTimer);
			slowTimer = setInterval(createSlowApple, slowAppleTimer);
			bonusTimer = setInterval(createBonusApple, bonusAppleTimer);
			flyTimer = setInterval(createFlyApple, flyAppleTimer);

			
			for(var i = 1;i<=1;i++)
			{
				deathTimer = setInterval(createDeathApple, deathAppleTimer);
			}	
		}

		for (var i = 0; p < 1; i++)
		{
			//  Create a apples inside groups
			var apple = apples.create(p * Math.floor((Math.random() * 650) + 40), p *Math.floor((Math.random() * 100) + 50), 'apple');
			var death = deaths.create(p * Math.floor((Math.random() * 650) + 40), p *Math.floor((Math.random() * 100) + 50), 'death');
			var slow = slows.create(p * Math.floor((Math.random() * 650) + 40), p *Math.floor((Math.random() * 100) + 50), 'slow');
			var bonus = bonuss.create(p * Math.floor((Math.random() * 650) + 40), p *Math.floor((Math.random() * 100) + 50), 'bonus');
			var flyApple = flyss.create(p * Math.floor((Math.random() * 650) + 40), p *Math.floor((Math.random() * 100) + 50), 'flyApple');


			apple.body.velocity.y =  appleSpeed;
			slow.body.velocity.y = slowAppleSpeed;
			death.body.velocity.y =  deathAppleSpeed;
			bonus.body.velocity.y =  bonusAppleSpeed;
			flyApple.body.velocity.y = flyAppleSpeed;

		   
			p = p + 6;
		}
		//Creating a normal apple
		function createApple() {
			 apple = apples.create(p * Math.floor((Math.random() * 650) + 40), p *Math.floor((Math.random() * 100) + 50), 'apple');             
			 apple.body.velocity.y = appleSpeed;         
		}
		//Creating a Death apple
		function createDeathApple()
		{
			death = deaths.create(p * Math.floor((Math.random() * 650) + 40), p *Math.floor((Math.random() * 100) + 50), 'death');
			death.body.velocity.y =  deathAppleSpeed;
		}
		//Creating a Slow apple
		function createSlowApple()
		{
			slow = slows.create(p * Math.floor((Math.random() * 650) + 40), p *Math.floor((Math.random() * 100) + 50), 'slow');
			slow.body.velocity.y =  slowAppleSpeed;
		}
		//Creating a Bonus apple
		function createBonusApple()
		{
			bonus = bonuss.create(p * Math.floor((Math.random() * 650) + 40), p *Math.floor((Math.random() * 100) + 50), 'bonus');
			bonus.body.velocity.y =  bonusAppleSpeed;
		}
		//Create a Fly apple
		function createFlyApple()
		{
			flyApple = flyss.create(p * Math.floor((Math.random() * 650) + 40), p *Math.floor((Math.random() * 100) + 50), 'flyApple');
			flyApple.body.velocity.y =  flyAppleSpeed;
		}
		//  Now let's create two ledges
		cursors = game.input.keyboard.createCursorKeys();
		this.input.keyboard.addKeyCapture([Phaser.Keyboard.ESC]);
		this.input.keyboard.addKeyCapture([Phaser.Keyboard.ENTER]);
	}


	function update() {
		if (alive) {
		Leap1();
			player.body.velocity.x = 0;
			//player.body.velocity.y = 0;
			if (cursors.left.isDown)
			{
				//  Move to the Right
				player.body.velocity.x = -playerSpeed;    
			}
			else if (cursors.right.isDown)
			{
				//  Move to the Left
				player.body.velocity.x = playerSpeed; 			
			}
			//FLYYYYYYINGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
			//Going up
			if(allowFlight == true)
			{
						if(cursors.up.isDown)
				{
					//Going up
					player.body.velocity.y =  -300;			
					
				}
				else
				{
					//Going Down
					player.body.velocity.y =  300;	
				}	
			}
			
			if (score > count) {
				appleSpeed = appleSpeed + 10;
				deathAppleSpeed = deathAppleSpeed + 10;
				bonusAppleSpeed = bonusAppleSpeed + 10;
				slowAppleSpeed = slowAppleSpeed + 10;		
			}
			count = count + 400;
			
			//COLLISION
			game.physics.arcade.overlap(player, apples, Apple, null, this);
			game.physics.arcade.overlap(player, deaths, death, null, this);
			game.physics.arcade.overlap(player, slows, slow, null, this);
			game.physics.arcade.overlap(player, bonuss, bonus, null, this);
			game.physics.arcade.overlap(player, flyss, Allowfly, null, this);
		}
		//When user died and presses ESC button it reloads the page
		if (this.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
			location.reload();
		}
		if (this.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
			location.reload();
		}
		//Lives
		if (lives == 2) {
			heart1.kill();
		}
		else if (lives == 1) {
			heart2.kill();
		}
		else if (lives == 0){
			heart3.kill();
		}

	}
	//Direction Function
	function direction(bodyX, appleX) {
			if (bodyX > appleX ) {
				player.animations.play('eatRight', 10, false, false);
			}
			else {
				player.animations.play('eatLeft', 10, false, false);
			}
	}

	//Apple function
	function Apple (player, apple) {		
		// Removes the apple from the screen
		apple.kill();

		score = score + 10;
		   //Determining the direction of the apple
			var bodyX = player.body.x + (player.body.width / 2);
			var appleX = apple.body.x + (apple.body.width / 2);
			direction(bodyX, appleX);       
			//Setting the value of the score
			scoreText.text = 'Score: ' + score;		
	}

	//Death Function
	function death(player, deathApple) {
		deathApple.kill();
		if (lives == 1) {
			text = game.add.text(game.world.centerX, game.world.centerY, "- Game Over -\n(Press ENTER to restart)", { font: "65px Arial", fill: "#ff0044", align: "center" });
			text.anchor.setTo(0.5, 0.5);

			var bodyX = player.body.x + (player.body.width / 2);
			var appleX = deathApple.body.x + (deathApple.body.width / 2);

			direction(bodyX, appleX);
			gameOver();
		}
		lives = lives - 1;
		stopFlight();
		lifeExplosion.play();
	}

	//Slow function
	function slow(player, slowApple) {
		setTimeout(normalSpeed, 4000);
		slowApple.kill();
		playerSpeed = 100;
		var bodyX = player.body.x + (player.body.width / 2);
		var appleX = slowApple.body.x + (slowApple.body.width / 2);
		direction(bodyX, appleX);
	}

	//Bonus function
	function bonus(player, bonusApple) {
		bonusApple.kill();
		score = score + 100;
		scoreText.text = 'Score: ' + score;
		var bodyX = player.body.x + (player.body.width / 2);
		var appleX = bonusApple.body.x + (bonusApple.body.width / 2);
		direction(bodyX, appleX);
	}

	//Allow a player to fly
	function Allowfly(player, flyApple) {
		setTimeout(stopFlight,10000);
		flyApple.kill();
		game.physics.arcade.enable(player);
		player.body.collideWorldBounds = true;
		allowFlight = true;
		}
	function stopFlight()
	{
		allowFlight = false;
		player.body.velocity.y =  300;
	}



	//if the player dies stop apples from creating
	function gameOver() {		
		game.add.sprite(player.body.x, player.body.y, 'explotion');
		player.kill();
		clearInterval(appleTimer);
		clearInterval(deathTimer);
		clearInterval(slowTimer);
		clearInterval(bonusTimer);
		clearInterval(flyTimer);
		alive = false;

	    deathExplosion.play();
	
	}

	//Fly apple function

	// function resetAnimation() {
	// 	 player.animations.stop(null, true);
	// }

	function normalSpeed() {
		playerSpeed = 500;
	}
	
