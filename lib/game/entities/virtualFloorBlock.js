ig.module(
	'game.entities.virtualFloorBlock'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityVirtualFloorBlock = ig.Entity.extend({//EntityVirtualFloorBlock
	size: {x: 16, y:16},
	gravityFactor:0,
	type: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.FIXED,
	animSheet: new ig.AnimationSheet( 'media/images/virtualfloor.png', 16, 16 ),
	turnOff:false,
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.addAnim( 'idle', .05, [0,1,2,3,4]);
	},
	update: function() {
		this.parent();
		
	}
});
});