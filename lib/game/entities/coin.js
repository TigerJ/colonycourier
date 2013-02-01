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
	bounciness: (Math.floor((Math.random()*3)+3)/10),
	whichCoin:0, 
	killTimer:null,
	bounceCount:0,
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
		var varientX = Math.floor((Math.random()*15)+5);
		var varientY = Math.floor((Math.random()*15)+50);
		// console.log(varientY);
		this.vel.x = (settings.flip ? -this.maxVel.x-varientX : this.maxVel.x+varientX);
		this.vel.y = -varientY;
		this.whichCoin = Math.floor((Math.random()*10)+1);
		
		switch(this.whichCoin)
		{
			case 1:
			case 2:
			case 3:
				this.currentAnim = this.anims.red;
			break;
			case 4:
			case 5:
			case 6:
				this.currentAnim = this.anims.orange;
			break;
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
		if(this.killTimer)
		{
			if(this.killTimer.delta() > 0 && this.currentAnim == this.anims.red_collected) 
			{
				this.anims.red_collected.rewind();
				this.kill();
			}
			if(this.killTimer.delta() > 0 && this.currentAnim == this.anims.blue_collected)
			{
				this.anims.blue_collected.rewind();
				this.kill();
			}
			if(this.killTimer.delta() > 0 && this.currentAnim == this.anims.orange_collected)
			{
				this.anims.orange_collected.rewind();
				this.kill();
			}
			if(this.killTimer.delta() > 0 && this.currentAnim == this.anims.purple_collected)
			{
				this.anims.purple_collected.rewind();
				this.kill();
			}
		}
	},
	check: function(other)
	{
		if(other.name=="player"&&!this.hasCollected)
		{
			this.killTimer= new ig.Timer(1);
			this.hasCollected=true;
			ig.game.collect_sfx.volume=0.1;
			ig.game.collect_sfx.play();
			this.gravityFactor=0;
			this.vel.y=-5;
			switch(this.whichCoin)
			{
				case 1:
				case 2:
				case 3:
					this.currentAnim = this.anims.red_collected;
				break;
				case 4:
				case 5:
				case 6:
					this.currentAnim = this.anims.orange_collected;
				break;
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
	},
	handleMovementTrace: function( res ) {
		this.parent( res );
		if( res.collision.x || res.collision.y ) {
			if(this.bounceCount<3)
			{
				//ig.game.spawnEntity(EntityCoin,this.pos.x,this.pos.y,{offset: {x:2,y:4},flip:this.flip});//goofing around
				ig.game.coinbounce_sfx.volume=0.1;
				ig.game.coinbounce_sfx.play();
				this.bounceCount++;
			}
		}
	}
});
});