ig.module(
	'game.entities.titlescreen'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityTitlescreen = ig.Entity.extend({
	size: {x: 320, y:240},
	gravityFactor:0,//VERY IMPORTANT. if your title screen falls off the level. this is why :)
	animSheet: new ig.AnimationSheet( 'media/images/title.png', 320, 240 ),	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.addAnim( 'idle', 1.5, [0,1,2,3,4] );
	},
	update: function() {
		//if they push any key bound to jump or mouse1 then turn off the title text and load the menu
		if(ig.input.pressed('jump') || ig.input.pressed('mouse1')) {
			ig.game.isTitleScreen=false;
			ig.game.loadLevelDeferred(LevelMainmenulevel);
		}
		this.parent();
	}
});
});