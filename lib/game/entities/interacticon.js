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
	spawner:"nobody",
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.addAnim( 'key', .15, [0,1,2,3,2,1]);
		this.addAnim( 'pad', .15, [4,5,6,7,6,5]);
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
		var speechArray=[];
		if(ig.input.pressed('interact'))
		{
			switch(this.spawner)
			{
				case "isaac":
					switch(ig.game.storyState)
					{
						case 0:
							if(ig.game.getEntitiesByType(EntityDialog).length<1)
							{
								speechArray[0]='Hurry and be careful!';
								speechArray[1]='Go see Tinkerer in the EASTERN sector';
								speechArray[2]='The robots are all haywire and attacking';
								ig.game.spawnEntity(EntityDialog,0,0,{textStrings:speechArray});
							}
						break;
						case 1:
							if(ig.game.getEntitiesByType(EntityDialog).length<1)
							{
								speechArray[0]='Polaris? Yeah right above us..';
								speechArray[1]='Head out and then immediatly up and left';
								speechArray[2]='I hope you have something to help you jump.';
								ig.game.spawnEntity(EntityDialog,0,0,{textStrings:speechArray});
							}
						break;
					}
				break;
				case "tinkerer":
					switch(ig.game.storyState)
					{
						case 0:
							//spawn dialog with texts here
							if(ig.game.getEntitiesByType(EntityDialog).length<1)
							{
								speechArray[0]='Well it\'s about time you showed up!';
								speechArray[1]='We don\'t have a second to spare!';
								speechArray[2]='These residential cleaning robots have gone mad!';
								speechArray[3]='Polaris is the SR. residential engineer,';
								speechArray[4]='Visit her in her to find out what is going on.';
								speechArray[5]='Her workshop is in the top WEST control tower.';
								speechArray[6]='Take this TURBO HOVER for your board';
								speechArray[7]='press (Y) button or [1] key to hover';
								speechArray[8]='You have 20 uses but It will recharge over time.';
								speechArray[9]='Please hurry';
								speechArray[10]='';
								speechArray[11]='';
								ig.game.spawnEntity(EntityDialog,0,0,{textStrings:speechArray});
								ig.game.storyState=1;
							}
						break;
						case 1:
							if(ig.game.getEntitiesByType(EntityDialog).length<1)
							{
								ig.game.spawnEntity(EntityDialog,0,0,{textStrings:['What are you waiting for!','Go to Polaris in the WEST','']});
							}
						break;
					}
				break;
			}
		}
	}
});
});