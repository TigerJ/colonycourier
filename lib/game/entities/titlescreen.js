ig.module(
	'game.entities.titlescreen'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityTitlescreen = ig.Entity.extend({
	
	// The players (collision) size is a bit smaller than the animation
	// frames, so we have to move the collision box a bit (offset)
	size: {x: 320, y:240},
	gravityFactor:0,
	//offset: {x: 4, y: 2},
	//maxVel: {x: 100, y: 200},
	//friction: {x: 600, y: 0},
	
	//type: ig.Entity.TYPE.A, // Player friendly group
	//checkAgainst: ig.Entity.TYPE.NONE,
	//collides: ig.Entity.COLLIDES.PASSIVE,
	animSheet: new ig.AnimationSheet( 'media/images/temptitlegraphic.png', 320, 240 ),	
	// These are our own properties. They are not defined in the base
	// ig.Entity class. We just use them internally for the Player
	/*flip: false,
	accelGround: 400,
	accelAir: 200,
	jump: 200,
	health: 10,
	flip: false,*/
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		// Add the animations
		this.addAnim( 'idle', 1, [0] );
	},
	update: function() {
		if(ig.input.pressed('jump') || ig.input.pressed('mouse1')) {
			ig.game.isTitleScreen=false;
			ig.game.loadLevelDeferred(LevelMainmenulevel);
			//ig.game.loadLevelDeferred(LevelTest_level);
			//if jump is pressed then we will load out test level.
		}
		this.parent();
	}
});
});