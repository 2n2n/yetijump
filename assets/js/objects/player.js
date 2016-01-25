function Player(x, y, name) {
    Phaser.Sprite.call(this, game, x, y, name)
    this.cursors = game.input.keyboard.createCursorKeys()
    game.add.existing(this)
    
    game.physics.p2.enable(this)
    
}

Player.prototype = Object.create(Phaser.Sprite.prototype)
Player.prototype.constructor = Player;
Player.prototype.update = function() {
    // console.log(this.body);
    if (this.cursors.left.isDown)
    {
    	this.body.moveLeft(400);
    }
    else if (this.cursors.right.isDown)
    {
    	this.body.moveRight(400);
    }

    if (this.cursors.up.isDown)
    {
    	this.body.moveUp(400);
    }
    else if (this.cursors.down.isDown)
    {
    	this.body.moveDown(400);
    }
}