ig.module(
	'game.entities.virtualfloorblock'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityVirtualFloorBlock = ig.Entity.extend({//EntityVirtualFloorBlock
	size: {x: 16, y:16},
	gravityFactor:0,
	type: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.PASSIVE,
	animSheet: new ig.AnimationSheet( 'media/images/virtualfloor.png', 32, 24 ),
	turnOff:false,
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.addAnim( 'idle', .05, [0,1,2,3,4]);
	},
	update: function() {
		this.parent();
		if(this.currentAnim==this.anims.on && this.currentAnim.loopCount>0)
		{
			this.currentAnim=this.anims.stay;
			this.anims.on.rewind();
		}
		if(this.name=='ab1')
		{
			this.pos.x=ig.game.screen.x+119;
			this.pos.y=ig.game.screen.y+7;
		}
		if(this.name=='ab2')
		{
			this.pos.x=ig.game.screen.x+127;
			this.pos.y=ig.game.screen.y+17;
		}
		if(this.name=='ab3')
		{
			this.pos.x=ig.game.screen.x+135;
			this.pos.y=ig.game.screen.y+7;
		}
		if(this.name=='ab4')
		{
			this.pos.x=ig.game.screen.x+143;
			this.pos.y=ig.game.screen.y+17;
		}
	}
});
});