ig.module(
	'game.entities.isaac'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityIsaac = ig.Entity.extend({

	size: {x: 16, y:16},
	offset: {x:2,y:4},
	maxVel: {x: 100, y: 200},
	friction: {x: 600, y: 0},
	type: ig.Entity.TYPE.A,
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.PASSIVE,
	animSheet: new ig.AnimationSheet( 'media/images/tinkerer.png', 16, 16 ),	
	// These are our own properties. They are not defined in the base
	// ig.Entity class. We just use them internally
	flip: false,
	accelGround: 400,
	accelAir: 200,
	jump: 200,
	health: 10,
	xspeed:40,
	walk:true,
	zIndex: 9,
	name:"isaac",
	thisTalks:false,
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		// Add the animations

		this.addAnim( 'walk', .1, [2,3,4,5]);
		this.addAnim( 'idle', 1, [1]);
	},
	update: function() {
		if(ig.game.isPaused==true)
		{
			//do nothing
		}
		else
		{
			this.currentAnim.flip.x = this.flip;
			// move!
			if(this.walk)
			{
				if( !ig.game.collisionMap.getTile(this.pos.x + (this.flip ? +1 : this.size.x -1), this.pos.y + this.size.y+1))
		        {
	            	this.flip = !this.flip;
	        	}
	        	var xdir = this.flip ? -1 : 1;
	        	this.vel.x = this.xspeed * xdir;
			}
			else
			{

			}
			if(this.touches(ig.game.getEntitiesByType(EntityPlayer)[0]))
			{
				this.walk=false;
				this.currentAnim=this.anims.idle;
				//prompt action?
				if(ig.game.getEntitiesByType(EntityInteracticon).length<1)
				{
					var xstart = this.flip ? -4 : 8
					ig.game.spawnEntity(EntityInteracticon,this.pos.x+xstart,this.pos.y-10,{spawner:'isaac',flip:this.flip});
					this.thisTalks=true;
				}
			}
			else
			{
				this.walk=true;
				this.currentAnim=this.anims.walk;
				if(this.thisTalks==true)
				{
					var LocalInter = ig.game.getEntitiesByType(EntityInteracticon);
					if(LocalInter.length>0)
					{
						LocalInter[0].kill();
						this.thisTalks=false;
					}
				}
			}
			this.parent();
		}
	},
	handleMovementTrace: function( res ){
		this.parent(res);
		//if you hit a wall...
		if(res.collision.x)
		{
			this.flip = !this.flip;
		}
	},
	check: function(other)
	{
		if(other.name=="door1")
		{
			this.flip = !this.flip;
		}
	}
});
});