ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.levels.test_level',
	'game.levels.test_level2',
	'game.levels.title_level',
	'game.levels.mainmenulevel',
	'game.entities.player',
	'game.entities.titlescreen',
	'game.entities.mainmenu',
	'game.entities.enemy',
	'game.entities.bullet',
	'game.entities.explode',
	'game.entities.coin'/*,
	'impact.debug.debug'*/
)
.defines(function(){

MyGame = ig.Game.extend({
	font: new ig.Font( 'media/04b03.font.png' ),
	gravity: 300,
	screenFollowY:560,//the pixel height of the level less the pixel hight of the viewable screen (800-240)
	screenFollowX:1600,//the pixel width of the level less the pixel width of the screen (1920-320)
	isTitleScreen:true,
	explode1_sfx:new ig.Sound( 'media/sound/compressed/explode.*',true ),
	collect_sfx:new ig.Sound( 'media/sound/compressed/collect4.*',true ),
	coinbounce_sfx:new ig.Sound( 'media/sound/compressed/collect3.*',true ),
	splat_sfx:new ig.Sound( 'media/sound/compressed/splat.*',true ),
	shoo1_sfx:new ig.Sound( 'media/sound/compressed/shoot1.*',true ),
	jump1_sfx:new ig.Sound( 'media/sound/compressed/jump1.*',true ),
	jump2_sfx:new ig.Sound( 'media/sound/compressed/jump2.*',true ),
	hurt1_sfx:new ig.Sound( 'media/sound/compressed/hurt1.*',true ),
	init: function() {
	//Bind controls
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
	//load initial level
	this.loadLevelDeferred(LevelTitle_level);
	// this.loadLevelDeferred(LevelTest_level2);//FOR TESTING
	},
	update: function() {
		//collect the player entity to use his x and y position for camera movement
		var EntityToFollow = this.getEntitiesByType( EntityPlayer )[0];
		//if we have a player...
		if( EntityToFollow ) {
			//set the screen x and y to the player x and y less half the width and height
			this.screen.x = EntityToFollow.pos.x - ig.system.width/2;
			this.screen.y = EntityToFollow.pos.y - ig.system.height/2;
			//if the player and screen is less than 0 and the screen x is not 16, set the screen to 0, the horizontal base
			if ((EntityToFollow.pos.x - ig.system.width/2)<0 && this.screen.x!=16)
			{
				this.screen.x=0;
			}
			//---NOTE--- set camera values (screenFolllowY and screenFollowX) for each level you are tracking player movement.
			//if the player's y less the center is greater than the vertical boundry 
			//AND the screen is not at the vertical boundry
			//set the screen to the vertical boundry
			if ((EntityToFollow.pos.y - ig.system.height/2)>this.screenFollowY && this.screen.y!=this.screenFollowY)
			{
				this.screen.y=this.screenFollowY;
			}
			//If the screen is above the vertical base, set it to the vertical base
			if ((EntityToFollow.pos.y - ig.system.height/2)<0)
			{
				this.screen.y=0;
			}
			//if the player's x less the center is greater than the horizontal boundry, set the x to the boundry
			if ((EntityToFollow.pos.x - ig.system.width/2)>this.screenFollowX)
			{
				this.screen.x=this.screenFollowX;
			}
		}
		// Update all entities and backgroundMaps
		this.parent();
	},
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		//if the titlescreen variable set in the init is true, display the title text
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