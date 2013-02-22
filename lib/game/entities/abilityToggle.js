ig.module(
	'game.entities.abilityToggle'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityAbilityToggle = ig.Entity.extend({
	size: {x: 10, y:10},
	gravityFactor:0,
	zIndex:90,
	type: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.NEVER,
	animSheet: new ig.AnimationSheet( 'media/images/ability_activate.png', 10, 10 ),
	turnOff:false,
	name:'',
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.addAnim( 'on', .05, [0,1,2,3]);
		this.addAnim( 'off', .05, [3,2,1,0]);
		this.addAnim('stay',1,[3]);
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