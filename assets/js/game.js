var game = new Phaser.Game(640, 480, Phaser.CANVAS, 'game');

function YetiiGame () {
    this.player = null;
    this.platforms = null;
    this.facing = 'left';
    this.jumpTimer = 0;
    this.cursors = null;
};

YetiiGame.prototype = {
    init: function() {
        this.game.renderer.renderSession.roundPixels = true
        this.physics.startSystem(Phaser.Physics.ARCADE)
        this.physics.arcade.gravity.y = 800
    },
    preload: function() {
        this.load.image('yetii', 'https://platformer-a2n2n-1.c9.io/assets/sprites/minion.png');
        this.load.baseURL = 'http://files.phaser.io.s3.amazonaws.com/codingtips/issue003/';
        this.load.crossOrigin = 'anonymous';
        
        this.load.image('background', 'assets/background.png');
        this.load.image('platform', 'assets/platform.png');
        this.load.image('ice-platform', 'assets/ice-platform.png');
    }, 
    create: function() {
        this.add.sprite(0,0, 'background')
        
        this.platforms = this.add.physicsGroup();
        
        this.platforms.create(0, 64, 'ice-platform');
        this.platforms.create(200, 180, 'platform');
        this.platforms.create(400, 296, 'ice-platform');
        this.platforms.create(600, 412, 'platform');
        
        this.platforms.setAll('body.allowGravity', false)
        this.platforms.setAll('body.immovable', true);
        this.platforms.setAll('body.velocity.x', 100)
        
        this.player = this.add.sprite(60,60, 'yetii')
        this.player.scale.setTo(-2,2)
        this.physics.arcade.enable(this.player)
    
        this.player.body.collideWorldBounds = true;
        
        this.cursors = this.input.keyboard.createCursorKeys();

    },
    wrapPlatform: function(platform) {
        if(platform.body.velocity.x < 0 && platform.x <= 160){
            platform.x = 640;
        }
        else if(platform.body.velocity.x > 0 && platform.x >= 640) {
            platform.x = -160
        }
    },
    setFriction: function(player, platform) {
        if(platform.key === 'ice-platform') {
            player.body.x -= platform.body.x - platform.body.prev.x
        }
    },
    update: function() {
        this.platforms.forEach(this.wrapPlatform, this)
        this.physics.arcade.collide(this.player, this.platforms, this.setFriction, null, this)
    
        var standing = this.player.body.blocked.down || this.player.body.touching.down;
        this.player.body.velocity.x = 0;
        
        if(this.cursors.left.isDown) {
            console.log('left');
            this.player.body.velocity.x = -200
            if(this.facing !== 'left') {
                this.facing = 'left'
            }
        }
        else if(this.cursors.right.isDown){
            this.player.body.velocity.x = 200
            if(this.facing !== 'right') {
                console.log(this.facing,'-> right');
                this.facing = 'right'
            }
        }
        else {
            if(this.facing !== 'idle') {
                console.log('idle');
                this.facing = 'idle'
            }
        }
        // dito sa conidition an to may error
        if(standing && this.cursors.up.isDown && this.time.time > this.jumpTimer) {
            
            this.player.body.velocity.y = -500;
            this.jumpTimer = this.time.time + 750;
        }
    
    }
    
}


game.state.add('Game', YetiiGame, true)
// game = (function($, window) {
//     // return new Phaser.Game(800, 600, Phaser.Auto, 'stage', {
//     //     preload: function() {
//     //         this.load.spritesheet('minion', 'assets/sprites/minion.png')
//     //         this.load.image('box', 'assets/sprites/box.png')
//     //         this.load.image('floor', 'assets/sprites/floor.png')
//     //         this.load.image('hero', 'assets/sprites/player.png')
//     //         this.load.image('enemy', 'assets/sprites/player2.png')
//     //     },
//     //     create: function() {
//     //         this.renderer.renderSession.roundPixels = true;
//     //         // this.physics.arcade.gravity.y = 100
//     //         this.stage.backgroundColor = '#2d2d2d'
//     //         this.minions = this.add.group();
//     //         this.minions.enableBody = true
//     //         this.minions.physicsBodyType = Phaser.Physics.ARCADE
//     //         this.game.physics.enable(this.minions, Phaser.Physics.ARCADE)
//     //         for(var i = 0; i < 10; i++){
//     //             minions.create(game.world.randomX/2, game.world.randomY/2, 'minion', 0);
//     //         }
//     //         minions.scale.setTo(2,2)
//     //         // minions.forEach(function(minion) {
//     //         //     console.log(minion);
//     //         // })
//     //         // this.physics.arcade.collide(this.minions);
//     //         // this.physics.arcade.add(this.entities.box)
//     //         // this.physics.p2.enable(this.entities.box)
//     //         // this.add.existing(this.entities.box)
//     //         //initiate the box function
            
//     //         // this.player = new Player(70, 60, 'minion')
//     //         // this.player.scale.setTo(2,2)
//     //         // var player= new Player(60, 60, 'enemy')
//     //         // player.scale.setTo(1,1)
//     //     },
//     //     update: function() {
            
//     //     },
//     //     render: function() {
//     //         // this.game.debug.spriteCoords(this.player, 100, 32)
//     //         // this.debug.spriteCoords(card, 32,32)
//     //         // this.debug.bodyInfo(this.player, 100, 32);
//     //         // this.debug.body(this.player);
//     //     },
//     //     entities: {}
        
//     // })
// })(jQuery, window) 