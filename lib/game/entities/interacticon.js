ig.module(
	'game.entities.interacticon'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityInteracticon = ig.Entity.extend({
	size: {x: 16, y:16},
	gravityFactor:0,
	zIndex:5,
	type: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.NEVER,
	animSheet: new ig.AnimationSheet( 'media/images/interacticon.png', 16, 16 ),
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.addAnim( 'key', .15, [0,1,2,3,2,1]);
		this.addAnim( 'pad', .15, [3,4,5,6,5,4]);
		if(ig.game.controllerConnected==true)
		{
			this.currentAnim=this.anims.pad;
		}
		else
		{
			this.currentAnim=this.anims.key;
		}
	},
	update: function() {
		this.parent();

	}
});
});