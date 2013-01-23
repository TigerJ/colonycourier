ig.module(
	'game.entities.enemy'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityEnemy = ig.Entity.extend({

	size: {x: 16, y:16},
	maxVel: {x: 100, y: 200},
	friction: {x: 600, y: 0},
	type: ig.Entity.TYPE.B, // Badguy Group
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.PASSIVE,
	animSheet: new ig.AnimationSheet( 'media/images/enemy.png', 16, 16 ),	
	// These are our own properties. They are not defined in the base
	// ig.Entity class. We just use them internally
	flip: false,
	accelGround: 400,
	accelAir: 200,
	jump: 200,
	health: 10,
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		// Add the animations
		this.addAnim( 'idle', .07, [1,2,3,4]);
	},
	update: function() {
		this.currentAnim.flip.x = this.flip;
		// move!
		this.parent();
	}
});
});