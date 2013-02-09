ig.module(
	'game.entities.playershield'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityPlayershield = ig.Entity.extend({
	size: {x: 32, y:32},
	offset: {x:2,y:4},
	gravityFactor:0,
	type: ig.Entity.TYPE.A,
	checkAgainst: ig.Entity.TYPE.B,
	collides: ig.Entity.COLLIDES.PASSIVE,
	animSheet: new ig.AnimationSheet( 'media/images/shield.png', 32, 32 ),
	turnOff:false,
	name:'',
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.addAnim('idle',.02,[0,1,2,3,4]);//out
	},
	update: function() {
		this.parent();
		this.pos.x=ig.game.getEntitiesByType(EntityPlayer)[0].pos.x-8;
		this.pos.y=ig.game.getEntitiesByType(EntityPlayer)[0].pos.y-8;
	},
	check: function(other) {
		if(other.name='rowbutt')
		{
			var bonusCoins = Math.floor((Math.random()*3));
			ig.game.spawnEntity(EntityExplode,other.pos.x,other.pos.y,{offset: {x:2,y:4}});
			other.kill();
			for(i=0;i<bonusCoins;i++)
			{
				var randomX = Math.floor((Math.random()*8)+1);
				ig.game.spawnEntity(EntityCoin,other.pos.x+randomX,other.pos.y,{offset: {x:2,y:4},flip:this.flip});
			}
			ig.game.spawnEntity(EntityCoin,other.pos.x,other.pos.y,{offset: {x:2,y:4},flip:this.flip});
			ig.game.getEntitiesByType(EntityHud)[0].turnOffAbility3=true;
		}
	}
});
});