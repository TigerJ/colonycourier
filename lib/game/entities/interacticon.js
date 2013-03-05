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
	animSheet: new ig.AnimationSheet( 'media/images/speechinteraction.png', 8, 8 ),
	spawner:"nobody",
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.addAnim( 'idle', 1, [0]);
	},
	update: function() {
		this.parent();
		this.currentAnim.flip.x = this.flip;
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
								speechArray[4]='Take her this cargentiaturette she needs.';
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
				case "polaris":
					switch(ig.game.storyState)
					{
						case 0:
							if(ig.game.getEntitiesByType(EntityDialog).length<1)
							{
								speechArray[0]='You shouldn\'t be up here yet';
								speechArray[1]='Either you are really good or you cheat';
								speechArray[2]='I\'m betting that you cheat';
								ig.game.spawnEntity(EntityDialog,0,0,{textStrings:speechArray});
							}
						break;
						case 1:
							if(ig.game.getEntitiesByType(EntityDialog).length<1)
							{
								speechArray[0]='He sent you to bring me a cargentiaturette...';
								speechArray[1]='He needs to make himslef a hearing aid!';
								speechArray[2]='What i needed was a gardentiasurette';
								speechArray[3]='Well, I guess I can use this cargentiaturette';
								speechArray[4]='and program your board with a robuster shot';
								speechArray[5]='It will be tricky and not that powerful';
								speechArray[6]='You can only fire 3 shots at once';
								speechArray[7]='It will be enought though to bust robots';
								speechArray[8]='Go look for the Centeral Cleaning CP-BOT';
								speechArray[9]='It locked the access to the commercial district';
								speechArray[10]='down and destorying it will break the lock';
								speechArray[11]='Come see me when you are done and I can open the door.';
								ig.game.spawnEntity(EntityDialog,0,0,{textStrings:speechArray});
							}
						break;
					}
				break;
			}
		}
	}
});
});