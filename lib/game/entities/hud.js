ig.module(
	'game.entities.hud'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityHud = ig.Entity.extend({
	size: {x: 320, y:32},
	gravityFactor:0,
	/*_wmIgnore:true,*/
	toggleAbility1:false,
	toggleAbility2:false,
	toggleAbility3:false,
	toggleAbility4:false,
	turnOffAbility1:false,
	turnOffAbility3:false,
	animSheet: new ig.AnimationSheet( 'media/images/hud.png', 320, 32 ),	
	ability1Timer:null,
	startAbility1Timer:false,
	//special spawn limiting variables
	hasSpawned386:false,
	hasSpawnedCavanagh:false,
	hasSpawnedBubble:false,
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.addAnim( 'idle', 1, [0] );
	},
	update: function() {
		this.parent();
		this.pos.x=ig.game.screen.x;
		this.pos.y=ig.game.screen.y;
		//386TurboHover
		if(ig.game._386turbo==true && this.hasSpawned386==false)//spawn UI/HUD element
		{
			this.hasSpawned386=true;
			ig.game.spawnEntity(Entity386TurboHover,ig.game.screen.x+120,ig.game.screen.y+8);
		}
		if(ig.input.pressed('ability1') && this.toggleAbility1==false && ig.game._386turboQty>0)//HoverTime
		{
			ig.game._386_sfx.volume=0.3;
			ig.game._386_sfx.play();
			ig.game.spawnEntity(EntityAbilityToggle,this.pos.x,this.pos.y,{name:'ab1'});//spawn visual toggle
			this.toggleAbility1=true;//set local property for ability combos
			ig.game.getEntitiesByType(EntityPlayer)[0].gravityFactor=0;//set player gravity to hover (0)
			ig.game.getEntitiesByType(EntityPlayer)[0].vel.y=0;//stop player from moving (fall to hover, jump into hover)
			this.ability1Timer=new ig.Timer(2);//set timer
			ig.game._386turboQty--;//expend 1 qty of hover ability
		}
		else if(ig.input.pressed('ability1') && this.toggleAbility1==true)//turn off if toggled
		{
			this.turnOffAbility1=true;
		}
		if(ig.game.getEntitiesByType(EntityPlayer)[0].gravityFactor==1 && this.toggleAbility1==true)//if the player's gravity is ever non-0 then turn off the ability
		{
			this.turnOffAbility1=true;	
		}
		if(this.ability1Timer)//if the time is up reset timer, turn off the ability
		{
			if(this.ability1Timer.delta()>0)
			{
				this.turnOffAbility1=true;
			}	
		}
		if(ig.game.getEntitiesByType(EntityPlayer)[0].vel.y!=0 && this.toggleAbility1==true)//if the player is in upward motion turn off the ability
		{
			this.turnOffAbility1=true;			
		}
		if(this.turnOffAbility1==true)//how we turn off ability 1
		{
			ig.game.getEntitiesByType(EntityPlayer)[0].gravityFactor=this.toggleAbility2 ? -1 : 1;//reset their gravity if cavanagh mode set GF to -1
			var abilities = ig.game.getEntitiesByType(EntityAbilityToggle);//collect all the ability entities and loop them
			var abilitiesLength = abilities.length;
			for(i=0;i<abilitiesLength;i++)
			{
				if(abilities[i].name=="ab1")
				{
					abilities[i].kill();
				}
			}
			this.toggleAbility1=false;//set the local property to false for combos
			this.ability1Timer=null;//wipe timer
			this.turnOffAbility1=false;//we turned it off so reset the boolean
		}




		//ability 2 Cavanagh
		//TODO: player shield not offsetting properly when inverted gravity takes effect.
		if(ig.game.Cavanagh==true && this.hasSpawnedCavanagh==false)
		{
			this.hasSpawnedCavanagh=true;
			ig.game.spawnEntity(EntityCavanagh,ig.game.screen.x+128,ig.game.screen.y+18);
		}

		if(ig.input.pressed('ability2') && this.toggleAbility2==false && ig.game.CavanaghQty>0)
		{
			ig.game.gravity_sfx.volume=0.3;
			ig.game.gravity_sfx.play();
			ig.game.spawnEntity(EntityAbilityToggle,this.pos.x,this.pos.y,{name:'ab2'});
			this.toggleAbility2=true;
			//get the player
			var playerEnt = ig.game.getEntitiesByType(EntityPlayer)[0];
			playerEnt.CavanaghEnabled=true;
			playerEnt.gravityFactor=-1;
			playerEnt.offset.x=0;
			playerEnt.offset.y=0;
			if(ig.game.getEntitiesByType(EntityPlayershield)[0])
			{
				ig.game.getEntitiesByType(EntityPlayershield)[0].offset.x=0;
				ig.game.getEntitiesByType(EntityPlayershield)[0].offset.y=0;
			}
			if(playerEnt.flip==true)
			{
				playerEnt.flip=false
			}
			else
			{
				playerEnt.flip=true;
			}
			ig.game.CavanaghQty--;
		}
		else if(ig.input.pressed('ability2') && this.toggleAbility2==true)
		{
			var playerEnt = ig.game.getEntitiesByType(EntityPlayer)[0];
			playerEnt.CavanaghEnabled=false;
			playerEnt.gravityFactor=1;
			playerEnt.offset.x=2;
			playerEnt.offset.y=4;
			if(ig.game.getEntitiesByType(EntityPlayershield)[0])
			{
				ig.game.getEntitiesByType(EntityPlayershield)[0].offset.x=2;
				ig.game.getEntitiesByType(EntityPlayershield)[0].offset.y=4;
			}
			if(playerEnt.flip==true)
			{
				playerEnt.flip=false
			}
			else
			{
				playerEnt.flip=true;
			}
			var abilities = ig.game.getEntitiesByType(EntityAbilityToggle);
			var abilitiesLength = abilities.length;
			for(i=0;i<abilitiesLength;i++)
			{
				if(abilities[i].name=="ab2")
				{
					abilities[i].kill();
				}
			}
			this.toggleAbility2=false;
			ig.game.ungravity_sfx.volume=0.3;
			ig.game.ungravity_sfx.play();
		}




		//ability 3, bubble
		if(ig.game.Bubble==true && this.hasSpawnedBubble==false)
		{
			this.hasSpawnedBubble=true;
			ig.game.spawnEntity(EntityBubble,ig.game.screen.x+136,ig.game.screen.y+8)
		}
		if(ig.input.pressed('ability3') && this.toggleAbility3==false && ig.game.BubbleQty>0)
		{
			ig.game.shield_sfx.volume=0.3;
			ig.game.shield_sfx.play();
			ig.game.spawnEntity(EntityAbilityToggle,this.pos.x,this.pos.y,{name:'ab3'});
			ig.game.spawnEntity(EntityPlayershield,0,0);
			this.toggleAbility3=true;
			ig.game.BubbleQty--;
		}
		else if(ig.input.pressed('ability3') && this.toggleAbility3==true)
		{
			this.turnOffAbility3=true;
		}
		if(this.turnOffAbility3==true)
		{
			var abilities = ig.game.getEntitiesByType(EntityAbilityToggle);
			var abilitiesLength = abilities.length;
			for(i=0;i<abilitiesLength;i++)
			{
				if(abilities[i].name=="ab3")
				{
					abilities[i].kill();
				}
			}
			ig.game.getEntitiesByType(EntityPlayershield)[0].kill();
			this.toggleAbility3=false;
			this.turnOffAbility3=false;
		}



		//ability 4 whistle
		if(ig.input.pressed('ability4') && this.toggleAbility4==false)
		{
			ig.game.spawnEntity(EntityAbilityToggle,this.pos.x,this.pos.y,{name:'ab4'});
			this.toggleAbility4=true;
		}
		else if(ig.input.pressed('ability4') && this.toggleAbility4==true)
		{
			var abilities = ig.game.getEntitiesByType(EntityAbilityToggle);
			var abilitiesLength = abilities.length;
			for(i=0;i<abilitiesLength;i++)
			{
				if(abilities[i].name=="ab4")
				{
					abilities[i].kill();
				}
			}
			this.toggleAbility4=false;
		}
	},
	draw: function(){
		this.parent();
		ig.system.context.font="10px System";
		ig.system.context.fillStyle="#FFFFFF";
		var redCoins = ig.game.cn_red;//make local save resources when referencing below
		var blueCoins = ig.game.cn_blue;//make local save resources when referencing below
		var orangeCoins = ig.game.cn_orange;//make local save resources when referencing below
		var purpleCoins = ig.game.cn_purple;//make local save resources when referencing below
		if(redCoins<10)
		{
			ig.system.context.fillText('00'+redCoins, 332, 17);
		}
		else if(redCoins<100)
		{
			ig.system.context.fillText('0'+redCoins, 332, 17);
		}
		else
		{
			ig.system.context.fillText(redCoins, 332, 17);
		}
		//blue
		if(blueCoins<10)
		{
			ig.system.context.fillText('00'+blueCoins, 332, 29);
		}
		else if(blueCoins<100)
		{
			ig.system.context.fillText('0'+blueCoins, 332, 29);
		}
		else
		{
			ig.system.context.fillText(blueCoins, 332, 29);
		}
		if(orangeCoins<10)
		{
			ig.system.context.fillText('00'+orangeCoins, 332, 41);
		}
		else if(orangeCoins<100)
		{
			ig.system.context.fillText('0'+orangeCoins, 332, 41);
		}
		else
		{
			ig.system.context.fillText(orangeCoins, 332, 41);
		}
		if(purpleCoins<10)
		{
			ig.system.context.fillText('00'+purpleCoins, 332, 53);
		}
		else if(purpleCoins<100)
		{
			ig.system.context.fillText('0'+purpleCoins, 332, 53);
		}
		else
		{
			ig.system.context.fillText(purpleCoins, 332, 53);
		}
	}
});
});