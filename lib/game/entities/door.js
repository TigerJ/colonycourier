ig.module(
	'game.entities.door'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityDoor = ig.Entity.extend({
	size: {x: 16, y:32},
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.PASSIVE,
	//weltmeister settingse
	_wmDrawBox:true,
	_wmScalable:true,
	//special setting to "warp"
	teleportTo:{x:0,y:0},
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
	},
	update: function() {
		this.parent();
	},
	check: function(other)
	{
		if(other.name=="player")
		{
			other.pos=this.teleportTo;
		}
	}
});
});