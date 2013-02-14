ig.module(
	'game.entities.door'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityDoor = ig.Entity.extend({
	size: {x: 24, y:40},
	type: ig.Entity.TYPE.A,
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.PASSIVE,
	animSheet: new ig.AnimationSheet( 'media/images/door1.png', 24, 40 ),	
	//weltmeister settingse
	/*_wmDrawBox:true,
	_wmScalable:true,*/
	//special setting to "warp"
	/*teleportTo:{x:0,y:0},*/
	open:false,
	gravityFactor:0,
	zIndex:5,
	startOpen:false,
	startClose:false,
	name:"door1",
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.addAnim( '_closed', 1, [0]);
		this.addAnim( 'open', 1, [3]);
		this.addAnim('opening', .08, [0,1,2,3]);
		this.addAnim('closing', .05, [3,2,1,0]);
	},
	update: function() {
		this.parent();
		var playerEnt = ig.game.getEntitiesByType(EntityPlayer)[0];
		if(this.touches(playerEnt) && this.open==false)
		{
			this.currentAnim=this.anims.open;
			this.open=true;
			ig.game.door1_close_sfx.volume=.3;
			ig.game.door1_close_sfx.play();
		}
		if(!this.touches(playerEnt) && this.open==true)
		{
			this.currentAnim=this.anims._closed;
			this.open=false;
			ig.game.door1_close_sfx.volume=.3;
			ig.game.door1_close_sfx.play();
		}
	},
	check: function(other)
	{
		
	}
});
});