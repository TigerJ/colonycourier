ig.module(
	'game.entities.dialog'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityDialog = ig.Entity.extend({
	size: {x: 240, y:48},
	gravityFactor:0,
	zIndex:5,//CAHNGE ME LATER
	type: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.NEVER,
	animSheet: new ig.AnimationSheet( 'media/images/dialog.png', 240, 48 ),
	speech:"TEST",
	textStrings:[],
	textLine1:"",
	textLine2:"",
	textLine3:"",
	textLine4:"",
	populating:true,
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.addAnim( 'idle',1,[0]);
		this.addAnim( 'prompt',.5,[1,2]);
		this.pos.x=ig.game.screen.x+40;
		this.pos.y=ig.game.screen.y+180;
		ig.game.isPaused=true;
		var divisions = (this.speech.length/35).ceil();
		//console.log(divisions);
		for (var i = divisions - 1; i >= 0; i--) {
			this.textStrings.push(this.speech.substring(0,35));
			this.speech=this.speech.substring(35);
		};
		var LocalInter = ig.game.getEntitiesByType(EntityInteracticon);
		if(LocalInter.length>0)
		{
			LocalInter[0].kill();
		}
	},
	update: function() {			
		if(this.textLine1.length!=this.textStrings[0].length)
			this.textLine1+=this.textStrings[0].substring(this.textLine1.length,this.textLine1.length+1);
		if(this.textLine1.length==this.textStrings[0].length && this.textStrings.length>0)
		{
			if(this.textLine2.length!=this.textStrings[1].length)
				this.textLine2+=this.textStrings[1].substring(this.textLine2.length,this.textLine2.length+1);
			console.log(this.textLine2);
		}
		console.log(this.textLine1);
		this.parent();
	},
	draw: function()
	{
		ig.game.font.draw(this.textLine1, ig.game.screen.x, ig.game.screen.y, ig.Font.ALIGN.LEFT );
		ig.game.font.draw(this.textLine2, ig.game.screen.x, ig.game.screen.y, ig.Font.ALIGN.LEFT );
		/*ig.game.font.draw(this.textLine3, ig.game.screen.x, ig.game.screen.y, ig.Font.ALIGN.LEFT );
		ig.game.font.draw(this.textLine4, ig.game.screen.x, ig.game.screen.y, ig.Font.ALIGN.LEFT );*/
	}
});
});