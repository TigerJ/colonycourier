ig.module(
	'game.entities.explode'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityExplode = ig.Entity.extend({
	size: {x: 16, y:16},
	gravityFactor:0,
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.PASSIVE,
	animSheet: new ig.AnimationSheet( 'media/images/explode.png', 16, 16 ),
	name:"explode",
	shotTimer:null,
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		// Add the animations
		this.addAnim( 'idle', 1, [0]);
		this.shotTimer= new ig.Timer(1);
	},
	update: function() {
		this.parent();
		if(this.shotTimer.delta()>0)
		{
			this.kill();
		}
	}
});
});