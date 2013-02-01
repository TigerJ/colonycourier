ig.module(
	'game.entities.door'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityDoor = ig.Entity.extend({
	size: {x: 16, y:32},
	offset:{x:0,y:8},
	gravityFactor:1,
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.PASSIVE,
	animSheet: new ig.AnimationSheet( 'media/images/door.png', 16, 32 ),
	friction: {x: 100, y: 0},//friction against objects
	linkToLevel:null,	
	// The fraction of force with which this entity bounces back in collisions
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		// Add the animations
		this.addAnim( 'idle', 1, [0]);
	},
	update: function() {
		this.parent();
	},
	check: function(other)
	{
		if(other.name=="player")
		{
			ig.game.loadLevelDeferred(LevelTest_level2);
		}
	}
});
});