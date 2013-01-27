ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityPlayer = ig.Entity.extend({
	size: {x: 16, y:16},//The size of the player
	maxVel: {x: 100, y: 200},//the players maximum velocity
	friction: {x: 600, y: 0},//friction against objects
	type: ig.Entity.TYPE.A, // Player friendly group
	checkAgainst: ig.Entity.TYPE.B,
	collides: ig.Entity.COLLIDES.PASSIVE,
	animSheet: new ig.AnimationSheet( 'media/images/player.png', 16, 16 ),	
	// These are our own properties. They are not defined in the base
	// ig.Entity class. We just use them internally for the Player
	flip: false,
	accelGround: 400,
	accelAir: 200,
	jump: 150,
	health: 10,
	name:"player",
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		// Add the animations
		//this gives the illusion of hovering up and down, however this will have to change soon :)
		this.addAnim( 'idle', .07, [1,2,2,3,3,3,3,3,3,3,2,2,1,1,1,1,1,1,1,1]);
		this.addAnim( 'startrun', 1, [4]);
		this.addAnim( 'run', 1,[5]);
		this.addAnim( 'jump', .05,[6,7]);
		this.addAnim( 'fall', .08,[8,9]);
	},
	update: function() {
		// move left or right
		var accel = this.standing ? this.accelGround : this.accelAir;
		if( ig.input.state('left') ) {
			this.accel.x = -accel;
			this.flip = true;
		}
		else if( ig.input.state('right') ) {
			this.accel.x = accel;
			this.flip = false;
		}
		else {
			this.accel.x = 0;
		}
		// jump
		if( this.standing && ig.input.pressed('jump') ) {
			this.vel.y = -this.jump;
		}
		// shoot
		if( ig.input.pressed('shoot') ) {
			//ig.game.spawnEntity( EntitySlimeGrenade, this.pos.x, this.pos.y, {flip:this.flip} );
			console.log("shoot");
		}
		// set the current animation, based on the player's speed
		if( this.vel.y < 0 ) {
			this.currentAnim = this.anims.jump;
		}
		else if( this.vel.y > 0 ) {
			this.currentAnim = this.anims.fall;
		}
		else if( this.vel.x != 0 )
		{
			if(this.vel.x<50 && this.vel.x>-50)
			{
				this.currentAnim = this.anims.startrun;
			}
			else
			{
				this.currentAnim = this.anims.run;
			}
		}
		else {
			this.currentAnim = this.anims.idle;
		}
		this.currentAnim.flip.x = this.flip;
		// move!
		this.parent();
	},
	check: function(other)
	{
		if(other.name=="rowbutt")
		{
			ig.game.spawnEntity(EntityPlayer,88,672);
			this.kill();

		}
	}
});

//THIS(below) IS CODE FROM THE JUMP AND RUN EXAMPLE WHICH I USED DURING THE STREAM TO SNAG BOILER PLATE CODE FOR OUR ENTITY
/*

// The grenades a player can throw are NOT in a separate file, because
// we don't need to be able to place them in Weltmeister. They are just used
// here in the code.

// Only entities that should be usable in Weltmeister need to be in their own
// file.
EntitySlimeGrenade = ig.Entity.extend({
	size: {x: 4, y: 4},
	offset: {x: 2, y: 2},
	maxVel: {x: 200, y: 200},
	
	
	// The fraction of force with which this entity bounces back in collisions
	bounciness: 0.6, 
	
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.B, // Check Against B - our evil enemy group
	collides: ig.Entity.COLLIDES.PASSIVE,
		
	animSheet: new ig.AnimationSheet( 'media/slime-grenade.png', 8, 8 ),
	
	bounceCounter: 0,
	
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.vel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
		this.vel.y = -50;
		this.addAnim( 'idle', 0.2, [0,1] );
	},
		
	handleMovementTrace: function( res ) {
		this.parent( res );
		if( res.collision.x || res.collision.y ) {
			
			// only bounce 3 times
			this.bounceCounter++;
			if( this.bounceCounter > 3 ) {
				this.kill();
			}
		}
	},
	
	// This function is called when this entity overlaps anonther entity of the
	// checkAgainst group. I.e. for this entity, all entities in the B group.
	check: function( other ) {
		other.receiveDamage( 10, this );
		this.kill();
	}	
});*/

});//         <-----this is important leave this here :)