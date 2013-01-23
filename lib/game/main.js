ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.levels.test_level',
	'game.levels.title_level',
	'game.levels.mainmenulevel',
	'game.entities.player',
	'game.entities.titlescreen',
	'game.entities.mainmenu',
	'game.entities.enemy'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	gravity: 300,
	screenFollowY:560,
	screenFollowX:1600,
	isTitleScreen:true,
	init: function() {
		// Initialize your game here; bind keys etc.
		ig.input.bind( ig.KEY.A, 'left' );
		ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
		ig.input.bind( ig.KEY.D, 'right' );
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
		ig.input.bind( ig.KEY.W, 'up');
		ig.input.bind( ig.KEY.UP_ARROW, 'up');
		ig.input.bind( ig.KEY.S, 'down');
		ig.input.bind (ig.KEY.DOWN_ARROW,'down');
		ig.input.bind( ig.KEY.SPACE, 'jump' );
		ig.input.bind( ig.KEY.Z, 'jump' );
		ig.input.bind( ig.KEY.X, 'shoot' );
		ig.input.bind(ig.KEY.MOUSE1,'mouse1');
		this.loadLevelDeferred(LevelTitle_level);
	},
	
	update: function() {
		var EntityToFollow = this.getEntitiesByType( EntityPlayer )[0];
		if( EntityToFollow ) {
			this.screen.x = EntityToFollow.pos.x - ig.system.width/2;
			this.screen.y = EntityToFollow.pos.y - ig.system.height/2;
			if ((EntityToFollow.pos.x - ig.system.width/2)<0 && this.screen.x!=16)
			{
				this.screen.x=0;
			}
			//bound camera south, screen y - veiwport = bounding int
			// 800 - 240 = 560
			// 320 - 240 = 80
			//NOTE set camera per level in the leveltoload switchcase above.
			if ((EntityToFollow.pos.y - ig.system.height/2)>this.screenFollowY && this.screen.y!=this.screenFollowY)
			{
				this.screen.y=this.screenFollowY;
			}
			if ((EntityToFollow.pos.y - ig.system.height/2)<0)
			{
				this.screen.y=0;
			}
			if ((EntityToFollow.pos.x - ig.system.width/2)>this.screenFollowX)
			{
				this.screen.x=this.screenFollowX;
			}
		}
		// Update all entities and backgroundMaps
		this.parent();
		
		// Add your own, additional update code here
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		
		// Add your own drawing code here
		//var x = ig.system.width/2,
		//	y = ig.system.height/2;
		if(this.isTitleScreen==true)
		{
			this.font.draw( 'Push "Z" to start!', 25, 200, ig.Font.ALIGN.LEFT );
		}
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 320, 240, 2 );

});
