ig.module(
	'game.entities.enemy'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityEnemy = ig.Entity.extend({

	size: {x: 12, y:12},
	offset: {x:2,y:6},
	maxVel: {x: 100, y: 200},
	friction: {x: 600, y: 0},
	type: ig.Entity.TYPE.B, // Badguy Group
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.PASSIVE,
	animSheet: new ig.AnimationSheet( 'media/images/enemy.png', 16, 16 ),	
	// These are our own properties. They are not defined in the base
	// ig.Entity class. We just use them internally
	flip: false,
	accelGround: 400,
	accelAir: 200,
	jump: 200,
	health: 10,
	xspeed:50,
	name:"rowbutt",
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		// Add the animations
		this.addAnim( 'idle', .07, [1,2,3,4]);
	},
	update: function() {
		if(ig.game.isPaused==true)
		{

		}
		else
		{

			this.currentAnim.flip.x = this.flip;
			// move!
			if( !ig.game.collisionMap.getTile(this.pos.x + (!this.flip ? +1 : this.size.x -1), this.pos.y + this.size.y+1))
	        {
	            this.flip = !this.flip;
	        }
	        var xdir = this.flip ? 1 : -1;
	        this.vel.x = this.xspeed * xdir;
	        this.parent();
		}
	},
	handleMovementTrace: function( res ){
		this.parent(res);
		//if you hit a wall...
		if(res.collision.x)
		{
			this.flip = !this.flip;
		}
	},
	check: function(other)
	{
		if(other.name="door1")
		{
			this.flip = !this.flip;
		}
		if(other.name="player")
		{
			other.isknocked=true;
            other.ktimer = new ig.Timer(.3);
            var mx = other.pos.x + other.size.y/2;
            var my = other.pos.y + other.size.x/2;
            var pAngle =  Math.atan2(
                my - (this.pos.y + this.size.y/2),
                mx - (this.pos.x + this.size.x/2)
            );
            other.vel.x = Math.cos(pAngle)*400;
            other.vel.y = Math.sin(pAngle)*300;
            // console.log (other.vel.x);
            if (other.vel.x < 100 && other.vel.x >= 0)
            {
                other.vel.x = other.vel.x+200;
            }
            if (other.vel.x <0 && other.vel.x > -100)
            {
                other.vel.x = other.vel.x-200;
            }
            if (other.vel.y < -30)
            {
                other.vel.y = -other.vel.y;
            }
		}
	}
});
});