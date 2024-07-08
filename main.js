const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false
      }
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };
  
  const game = new Phaser.Game(config);
  
  function preload() {
    this.load.reset();

    console.log("Preload function executed");
    this.load.image('court', '/assets/Courts/ClayCourt.jpg');
    this.load.spritesheet('player', '/assets/PC/Fonz.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('ball', 'assets/tennisBall.png');
  }
  
  
  function create() {
    console.log("Create function executed");
    this.add.image(400, 300, 'court');
  
    this.player = this.physics.add.sprite(400, 500, 'player');


    this.ball = this.physics.add.sprite(400, 300, 'ball');
    this.physics.world.enable(this.ball);
    this.ball.setBounce(1);
    this.ball.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();
  }
  
  
  function update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
    } else {
      this.player.setVelocityX(0);
    }
  
    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-160);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(160);
    } else {
      this.player.setVelocityY(0);
    }

    this.physics.add.collider(this.ball, this.player, hitBall, null, this);
  }
  
  function hitBall(player, ball) {
    ball.setVelocity(Phaser.Math.Between(-200, 200), -200);
  }