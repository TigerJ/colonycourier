ig.module(
	'game.entities.lifemeter'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityLifemeter = ig.Entity.extend({
	size: {x: 78, y:6},
	gravityFactor:0,
	zIndex:90,
	type: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.NEVER,
	animSheet: new ig.AnimationSheet( 'media/images/lifemeter', 78, 6 ),
	turnOff:false,
	name:'',
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.addAnim( 'idle', .5, [1,2,3,2]);
	},
	update: function() {
		this.pos.x=ig.game.screen.x+33;
		this.pos.y=ig.game.screen.y+9;
		this.parent();
	}
});
});