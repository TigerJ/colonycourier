ig.module(
	'game.entities.lifemeterover'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityLifemeterover = ig.Entity.extend({
	size: {x: 78, y:6},
	gravityFactor:0,
	zIndex:90,
	type: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.NEVER,
	animSheet: new ig.AnimationSheet( 'media/images/lifemeterover.png', 78, 6 ),
	turnOff:false,
	name:'',
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.addAnim( 'idle', 1, [3]);
	},
	update: function() {
		this.pos.x=ig.game.screen.x+33;
		this.pos.y=ig.game.screen.y+9;
		this.parent();
	}
});
});