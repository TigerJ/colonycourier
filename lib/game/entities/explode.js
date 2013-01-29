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
	//shotTimer:null,
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		// Add the animations
		this.addAnim( 'idle', .05, [0,1,2,3]);
		ig.game.explode1_sfx.volume=0.1;
		ig.game.explode1_sfx.play();
		//this.shotTimer= new ig.Timer(1);
	},
	update: function() {
		this.parent();
		/*if(this.shotTimer.delta()>0)
		{
			this.kill();
		}*/
		if(this.currentAnim.loopCount > 0)
		{
			this.anims.idle.rewind();
			this.kill();
		}
	}
});
});