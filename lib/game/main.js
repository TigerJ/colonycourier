ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.levels.test_level',
	'game.levels.test_level2',
	'game.levels.title_level',
	'game.levels.world',
	'game.levels.residential',
	'game.levels.mainmenulevel',
	'game.entities.player',
	'game.entities.titlescreen',
	'game.entities.mainmenu',
	'game.entities.enemy',
	'game.entities.bullet',
	'game.entities.explode',
	'game.entities.coin',
	'game.entities.door',
	'game.entities.hud',
	'game.entities.abilityToggle',
	'game.entities.386TurboHover',
	'game.entities.cavanagh',
	'game.entities.bubble',
	'game.entities.playershield',
	'game.entities.tinkerer',
	'game.entities.isaac',
	'game.entities.polaris',
	'game.entities.interacticon',
	'game.entities.resboss',
	'game.entities.dialog'/*,
	'impact.debug.debug'*/
)
.defines(function(){

MyGame = ig.Game.extend({
	font: new ig.Font( 'media/04b03.font.png' ),
	font2: new ig.Font( 'media/sys_8_white.png' ),
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
	gravity_sfx:new ig.Sound( 'media/sound/compressed/gravity.*',true ),
	ungravity_sfx:new ig.Sound( 'media/sound/compressed/ungravity.*',true ),
	shield_sfx:new ig.Sound( 'media/sound/compressed/shield.*',true ),
	_386_sfx:new ig.Sound( 'media/sound/compressed/_386.*',true ),
	collect5_sfx:new ig.Sound( 'media/sound/compressed/collect5.*',true ),
	door1_sfx:new ig.Sound( 'media/sound/compressed/door1.*',true ),
	door1_close_sfx:new ig.Sound( 'media/sound/compressed/door1_close.*',true ),
	cn_red:0,
	cn_blue:0,
	cn_orange:0,
	cn_purple:0,
	//usually these will be false unless the player has made their initial discovery of them
	_386turbo:true,
	Cavanagh:true,
	Bubble:true,
	//this counts the available uses and is used to show the proper animation to the player
	_386turboQty:20,
	CavanaghQty:10,
	BubbleQty:10,
	_386turboRate:20,
	_386turboCharge:null,
	controllerConnected:false,
	storyState:0,
	isPaused:false,
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
		ig.input.bind( ig.KEY.Q, 'jump' );
		ig.input.bind( ig.KEY.Z, 'jump' );
		ig.input.bind( ig.KEY.SPACE, 'jump' );
		ig.input.bind( ig.KEY.X, 'shoot' );
		ig.input.bind( ig.KEY.W, 'shoot' );
		ig.input.bind( ig.KEY.E, 'interact');
		ig.input.bind(ig.KEY.MOUSE1,'mouse1');
		ig.input.bind( ig.KEY._1, 'ability1' );
		ig.input.bind( ig.KEY._2, 'ability2' );
		ig.input.bind( ig.KEY._3, 'ability3' );
		ig.input.bind( ig.KEY._4, 'ability4' );
		//load initial level
		this.loadLevelDeferred(LevelTitle_level);
		// this.loadLevelDeferred(LevelTest_level2);//FOR TESTING

		//if player has turbo start charger
		if(this._386turbo==true)
		{
			this._386turboCharge=new ig.Timer(this._386turboRate);
		}
	},
	update: function() {
		//rng test
		//console.log(Math.floor((Math.random()*3)+13)/100);
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
		//check recharge timers
		if(this._386turboCharge.delta()>0)
		{
			this._386turboCharge = new ig.Timer(this._386turboRate);
			if(this._386turboQty<10)
			{
				this._386turboQty++;
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
			this.font.draw( 'Push "Q" to start!', 25, 200, ig.Font.ALIGN.LEFT );
		}
	}
});
// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 320, 240, 2 );

});