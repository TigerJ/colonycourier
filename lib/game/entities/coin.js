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
	//shotTimer:null,
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		// Add the animations
		this.addAnim( 'red', .07, [0,2,4,6]);
		this.addAnim( 'red_collected', 2, [8]);
		this.vel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
		this.vel.y = -50;
		//this.shotTimer= new ig.Timer(1);
	},
	update: function() {
		this.parent();
		/*if(this.shotTimer.delta()>0)
		{
			this.kill();
		}*/
		if(this.currentAnim.loopCount > 0 && this.currentAnim == this.anims.red_collected)
		{
			this.anims.red_collected.rewind();
			this.kill();
		}
		else if(this.currentAnim == this.anims.red_collected)
		{
			
		}
	},
	check: function(other)
	{
		if(other.name=="player"&&!this.hasCollected)
		{
			this.hasCollected=true;
			ig.game.collect_sfx.volume=0.1;
			ig.game.collect_sfx.play();
			this.currentAnim = this.anims.red_collected;
		}
	}
});
});