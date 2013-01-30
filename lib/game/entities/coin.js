ig.module(
	'game.entities.coin'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityCoin = ig.Entity.extend({
	size: {x: 8, y:8},
	gravityFactor:1,
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.PASSIVE,
	animSheet: new ig.AnimationSheet( 'media/images/coins.png', 8, 8 ),
	name:"coin",
	hasCollected:false,
	maxVel: {x: 100, y: 100},
	friction: {x: 100, y: 0},//friction against objects	
	// The fraction of force with which this entity bounces back in collisions
	bounciness: 0.6,
	whichCoin:0, 
	//shotTimer:null,
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		// Add the animations
		this.addAnim( 'red', .07, [0,2,4,6]);
		this.addAnim( 'red_collected', 2, [8]);
		this.addAnim( 'blue', .07, [1,3,5,7]);
		this.addAnim( 'blue_collected', 2, [9]);
		this.addAnim( 'orange', .07, [10,12,14,16]);
		this.addAnim( 'orange_collected', 2, [18]);
		this.addAnim( 'purple', .07, [11,13,15,17]);
		this.addAnim( 'purple_collected', 2, [19]);
		this.vel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
		this.vel.y = -50;
		this.whichCoin = Math.round((Math.random()*10));
		//this.shotTimer= new ig.Timer(1);
		switch(this.whichCoin)
		{
			case 0:
				case 1:
				case 2:
				case 3:
					this.currentAnim = this.anims.red;
				break;
				case 4:
				case 5:
					this.currentAnim = this.anims.orange;
				break;
				case 6:
				case 7:
				case 8:
				case 9:
					this.currentAnim = this.anims.blue;
				break;
				case 10:
					this.currentAnim = this.anims.purple;
				break;
		}
	},
	update: function() {
		this.parent();
		if(this.currentAnim.loopCount > 0 && this.currentAnim == this.anims.red_collected) 
		{
			this.anims.red_collected.rewind();
			this.kill();
		}
		if(this.currentAnim.loopCount > 0 && this.currentAnim == this.anims.blue_collected)
		{
			this.anims.blue_collected.rewind();
			this.kill();
		}
		if(this.currentAnim.loopCount > 0 && this.currentAnim == this.anims.orange_collected)
		{
			this.anims.orange_collected.rewind();
			this.kill();
		}
		if(this.currentAnim.loopCount > 0 && this.currentAnim == this.anims.purple_collected)
		{
			this.anims.purple_collected.rewind();
			this.kill();
		}
	},
	check: function(other)
	{
		if(other.name=="player"&&!this.hasCollected)
		{
			this.hasCollected=true;
			ig.game.collect_sfx.volume=0.1;
			ig.game.collect_sfx.play();
			switch(this.whichCoin)
			{
				case 0:
				case 1:
				case 2:
				case 3:
					this.currentAnim = this.anims.red_collected;
				break;
				case 4:
				case 5:
					this.currentAnim = this.anims.orange_collected;
				break;
				case 6:
				case 7:
				case 8:
				case 9:
					this.currentAnim = this.anims.blue_collected;
				break;
				case 10:
					this.currentAnim = this.anims.purple_collected;
				break;
			}
		}
	}
});
});