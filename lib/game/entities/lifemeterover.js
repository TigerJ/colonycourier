ig.module(
	'game.entities.lifemeterover'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityLifemeterover = ig.Entity.extend({
	size: {x: 78, y:6},
	gravityFactor:0,
	zIndex:90,
	type: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.NEVER,
	animSheet: new ig.AnimationSheet( 'media/images/lifemeterover.png', 78, 6 ),
	turnOff:false,
	name:'',
	currentHealth:3,
	checkFrame:false,
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.addAnim( 'idle', 1, [15]);
		this.addAnim('healthTo2', .08, [15,16,17]);
		this.addAnim('healthTo2Stable',1,[17]);
	},
	update: function() {
		this.pos.x=ig.game.screen.x+33;
		this.pos.y=ig.game.screen.y+9;
		if(ig.game.deductHealth==true && this.currentHealth==3)//set 3 for test value
		{
			this.currentHealth--;
			switch(this.currentHealth)
			{
				case 2:
					this.currentAnim=this.anims.healthTo2;
					this.checkFrame=true;
				break;
			}
			ig.game.deductHealth=false;
		}
		if(this.checkFrame==true)
		{
			//console.log(this.currentAnim.frame);
			//console.log(this.currentHealth);
			if(this.currentHealth==2 && this.currentAnim.frame==2)
			{
				this.currentAnim=this.anims.healthTo2Stable;
			}
		}
		this.parent();
	}
});
});