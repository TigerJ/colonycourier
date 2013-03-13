ig.module(
	'game.entities.resboss'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityResboss = ig.Entity.extend({

	size: {x: 160, y:160},
	offset: {x:0,y:0},
	maxVel: {x: 100, y: 200},
	friction: {x: 600, y: 0},
	type: ig.Entity.TYPE.B, // Badguy Group
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.PASSIVE,
	animSheet: new ig.AnimationSheet( 'media/images/bosstemp.png', 160, 160 ),	
	// These are our own properties. They are not defined in the base
	// ig.Entity class. We just use them internally
	flip: false,
	accelGround: 400,
	accelAir: 200,
	jump: 200,
	health: 10,
	xspeed:50,
	name:"resboss",
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		// Add the animations
		this.addAnim( 'idle', 1, [0]);
	},
	update: function() {
		if(ig.game.isPaused==true)
		{

		}
		else
		{

			/*this.currentAnim.flip.x = this.flip;
			// move!
			if( !ig.game.collisionMap.getTile(this.pos.x + (!this.flip ? +1 : this.size.x -1), this.pos.y + this.size.y+1))
	        {
	            this.flip = !this.flip;
	        }
	        var xdir = this.flip ? 1 : -1;
	        this.vel.x = this.xspeed * xdir;*/
	        this.parent();
		}
	},
	handleMovementTrace: function( res ){
		this.parent(res);
		/*//if you hit a wall...
		if(res.collision.x)
		{
			this.flip = !this.flip;
		}*/
	},
	check: function(other)
	{
		/*if(other.name="door1")
		{
			this.flip = !this.flip;
		}*/
	}
});
});