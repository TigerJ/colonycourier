ig.module(
	'game.entities.bullet'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityBullet = ig.Entity.extend({
	size: {x: 6, y:4},
	offset: {x:5,y:6},
	maxVel: {x: 200, y: 200},
	gravityFactor:0,
	type: ig.Entity.TYPE.A,
	checkAgainst: ig.Entity.TYPE.B,
	collides: ig.Entity.COLLIDES.PASSIVE,
	animSheet: new ig.AnimationSheet( 'media/images/bullet.png', 16, 16 ),	
	name:"bullet",
	shotTimer:null,
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.addAnim( 'idle', .07, [0,1,2]);
		this.addAnim( 'splat',.1,[3,4,5]);
		this.shotTimer= new ig.Timer(2);
	},
	update: function() {
		this.parent();
		if(this.shotTimer.delta()>0)
		{
			this.kill();
		}
		if(this.currentAnim.loopCount > 0 && this.currentAnim==this.anims.splat)
		{
			this.anims.splat.rewind();
			this.kill();
		}
	},
	check: function(other)
	{
		if(other.name='rowbutt')
		{
			ig.game.spawnEntity(EntityExplode,other.pos.x,other.pos.y,{offset: {x:2,y:4}});
			other.kill();
			ig.game.spawnEntity(EntityCoin,other.pos.x,other.pos.y,{offset: {x:2,y:4},flip:this.flip});
			this.kill();
		}
		else
		{
			this.kill;
		}
	},
	handleMovementTrace: function( res ){
		this.parent(res);
		if(res.collision.x)
		{
			this.offset.x=15;
			this.offset.y=10;
			this.currentAnim=this.anims.splat.rewind();
			ig.game.splat_sfx.volume=0.3;
			ig.game.splat_sfx.play();
		}
	}
});
});