ig.module(
	'game.entities.mainmenu'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityMainmenu = ig.Entity.extend({
	
	// The players (collision) size is a bit smaller than the animation
	// frames, so we have to move the collision box a bit (offset)
	size: {x: 320, y:240},
	gravityFactor:0,
	//offset: {x: 4, y: 2},
	//maxVel: {x: 100, y: 200},
	//friction: {x: 600, y: 0},
	
	//type: ig.Entity.TYPE.A, // Player friendly group
	//checkAgainst: ig.Entity.TYPE.NONE,
	//collides: ig.Entity.COLLIDES.PASSIVE,
	animSheet: new ig.AnimationSheet( 'media/images/menu.png', 320, 240 ),
	menuState:1,
	// These are our own properties. They are not defined in the base
	// ig.Entity class. We just use them internally for the Player
	/*flip: false,
	accelGround: 400,
	accelAir: 200,
	jump: 200,
	health: 10,
	flip: false,*/
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		// Add the animations
		this.addAnim( 'idle', 1, [0] );
		this.addAnim( 'NewGame', 1, [1] );
		this.addAnim( 'Options', 1, [2] );
		this.addAnim( 'Credits', 1, [3] );
		// this.addAmim( 'NewGame',1,[1]);
		// this.addAmim( 'Options',1,[2]);
		// this.addAmim( 'Credits',1,[3]);
	},
	update: function() {
		if(ig.input.pressed('down'))
		{
			this.menuState++;
			if(this.menuState>3)
			{
				this.menuState=1;
			}
		}
		if(ig.input.pressed('up'))
		{
			this.menuState--;
			if(this.menuState<1)
			{
				this.menuState=3;
			}
		}
		
		//console.log(this.menuState);




		/*console.log(ig.input.mouse.x);
		console.log(ig.input.mouse.y);*/
		var mouseX = ig.input.mouse.x;
		var mouseY = ig.input.mouse.y;
		if(mouseX>64 && mouseX < 256 && mouseY > 32 && mouseY < 64)
		{
			//this.currentAnim = this.anims.NewGame;
			this.menuState=1;
			if(ig.input.pressed('jump') || ig.input.pressed('mouse1'))
			{
				ig.game.loadLevelDeferred(LevelTest_level);
			}
			//if click do action here
		}
		else if (mouseX>64 && mouseX < 256 && mouseY > 96 && mouseY < 128)
		{
			//this.currentAnim = this.anims.Options;
			this.menuState=2;
		}
		else if (mouseX>64 && mouseX < 256 && mouseY > 160 && mouseY < 192)
		{
			//this.currentAnim = this.anims.Credits;
			this.menuState=3;
		}
		else
		{
			//this.currentAnim = this.anims.idle;
		}
		/*if(ig.input.pressed('jump')) {
			ig.game.isTitleScreen=false;
			ig.game.loadLevelDeferred(LevelTest_level);
			//if jump is pressed then we will load out test level.
		}*/
		switch(this.menuState)
		{
			case 0: 
				this.currentAnim=this.anims.idle;
			break;
			case 1: 
				this.currentAnim=this.anims.NewGame;
				if(ig.input.pressed('jump'))
				{
					ig.game.loadLevelDeferred(LevelTest_level);
				}
			break;
			case 2: 
				this.currentAnim=this.anims.Options;
			break;
			case 3: 
				this.currentAnim=this.anims.Credits;
			break;
		}
		this.parent();
	}
});
});