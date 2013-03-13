ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityPlayer = ig.Entity.extend({
	size: {x: 14, y:14},//The size of the player
	offset: {x:2,y:4},
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
	zIndex: 10,
	name:"player",
	spawnedVFBlock:false,
	CavanaghEnabled:false,
	ignorePause:false,
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		// Add the animations
		//this gives the illusion of hovering up and down, however this will have to change soon :)
		this.addAnim( 'idle', .07, [1,2,2,3,3,3,3,3,3,3,2,2,1,1,1,1,1,1,1,1]);
		this.addAnim( 'startrun', 1, [4]);
		this.addAnim( 'run', 1,[5]);
		this.addAnim( 'jump', .05,[6,7]);
		this.addAnim( 'fall', .08,[8,9]);
		this.addAnim( '_386turbo',.08,[10,11]);
		this.addAnim( '_386turborun',.08,[12,13]);
		/*this.addAnim( 'beginWeapon', .1, [2,10,11,12]);
		this.addAnim('weaponIdle',1,[12]);*/
		/*this.addAnim( 'shoot',1,[13]);*/
		//spawn hud
		//ig.game.spawnEntity(EntityHud,ig.game.screen.x,ig.game.screen.y);
	},
	update: function() {
		if(ig.game.isPaused==true)
		{
			//do nothing
		}
		else
		{
			// move left or right
			var accel = this.standing ? this.accelGround : this.accelAir;
			if( ig.input.state('left') ) {
				this.accel.x = -accel;
				if(this.CavanaghEnabled==false)
				{
					this.flip = true;
				}
				else
				{
					this.flip=false;
				}
			}
			else if( ig.input.state('right') ) {
				this.accel.x = accel;
				if(this.CavanaghEnabled==false)
				{
					this.flip = false;
				}
				else
				{
					this.flip=true;
				}
			}
			else {
				this.accel.x = 0;
			}
			// jump
			if( this.vel.y==0 && ig.input.pressed('jump') && this.CavanaghEnabled==false ) 
			{
				this.vel.y = -this.jump;
			}
			if( this.vel.y==0 && ig.input.pressed('jump') && this.CavanaghEnabled==true ) 
			{
				this.vel.y = this.jump;
			}
			if( this.vel.y < 0 ) {
				this.currentAnim = this.anims.jump;
			}
			else if( this.vel.y > 0 ) {
				this.currentAnim = this.anims.fall;
			}
			else if( this.vel.x != 0 )
			{
				if(this.gravityFactor!=0)//if not turbo hover
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
				else//turbo hover animation
				{
					this.currentAnim = this.anims._386turborun;
				}
			}
			else 
			{
				if(this.gravityFactor!=0)//if not turbo hover
				{
					this.currentAnim = this.anims.idle;
				}
				else//turbo hover animation
				{
					this.currentAnim = this.anims._386turbo;
				}
			}
			this.currentAnim.flip.x = this.flip;
			if(ig.input.pressed("shoot"))
			{
				if(ig.game.getEntitiesByType(EntityBullet).length<3)
				{
					// this.currentAnim=this.anims.shoot;
					if(this.CavanaghEnabled==false)
					{
						var xdir = this.flip ? 1 : -1;
					}
					else
					{
						var xdir = this.flip ? -1 : 1;
					}
					if(!this.flip)
					{
						ig.game.spawnEntity(EntityBullet,(this.pos.x-15*xdir),(this.pos.y+8),{flip:this.flip, vel:{x:-200*xdir}});
					}
					else
					{
						ig.game.spawnEntity(EntityBullet,(this.pos.x-9*xdir),(this.pos.y+8),{flip:this.flip, vel:{x:-200*xdir}});
					}
				}
			}
			//if CavanaghEnabled, set all anims to 3.14 radians, else set all anims to 0 radians
			if(this.CavanaghEnabled==true)
			{
				this.anims.idle.angle=3.14;
				this.anims.startrun.angle=3.14;
				this.anims.run.angle=3.14;
				this.anims.jump.angle=3.14;
				this.anims.fall.angle=3.14;
				this.anims._386turbo.angle=3.14;
				this.anims._386turborun.angle=3.14;
			}
			else
			{
				this.anims.idle.angle=0;
				this.anims.startrun.angle=0;
				this.anims.run.angle=0;
				this.anims.jump.angle=0;
				this.anims.fall.angle=0;
				this.anims._386turbo.angle=0;
				this.anims._386turborun.angle=0;
			}
			this.parent();
		}
	},
	check: function(other)
	{
		if(other.name=="rowbutt")
		{
			ig.game.deductHealth=true;
			/*ig.game.spawnEntity(EntityPlayer,88,672);
			ig.game.hurt1_sfx.volume=0.3;
			ig.game.hurt1_sfx.play();
			this.kill();*/
		}
	},
	handleMovementTrace: function(res)
	{
		this.parent(res);
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