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
	/*speech:"TEST",*/
	textStrings:[],
	textLine1:"",
	textLine2:"",
	textLine3:"",
	textLine4:"",
	populating:true,
	conversationPosition:0,
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.addAnim( 'idle',1,[0]);
		this.addAnim( 'prompt',.5,[1,2]);
		this.pos.x=ig.game.screen.x+40;
		this.pos.y=ig.game.screen.y+180;
		ig.game.isPaused=true;
		/*var divisions = (this.speech.length/35).ceil();
		//console.log(divisions);
		for (var i = divisions - 1; i >= 0; i--) {
			this.textStrings.push(this.speech.substring(0,35));
			this.speech=this.speech.substring(35);
		};*/
		var LocalInter = ig.game.getEntitiesByType(EntityInteracticon);
		if(LocalInter.length>0)
		{
			LocalInter[0].kill();
		}
	},
	update: function() {
		if(this.populating)
		{
			if(this.textLine1.length!=this.textStrings[this.conversationPosition].length)
			{
				this.textLine1+=this.textStrings[this.conversationPosition].substring(this.textLine1.length,this.textLine1.length+1);
			}
			if(this.textLine1.length==this.textStrings[this.conversationPosition].length && this.textStrings.length-this.conversationPosition+1>this.conversationPosition)
			{
				if(this.textLine2.length!=this.textStrings[this.conversationPosition+1].length)
				{
					this.textLine2+=this.textStrings[this.conversationPosition+1].substring(this.textLine2.length,this.textLine2.length+1);
				}
			}
			if(this.textLine1.length==this.textStrings[this.conversationPosition].length && this.textLine2.length==this.textStrings[this.conversationPosition+1].length && this.textStrings.length>this.conversationPosition+1)
			{
				if(this.textLine3.length!=this.textStrings[this.conversationPosition+2].length)
				{
					this.textLine3+=this.textStrings[this.conversationPosition+2].substring(this.textLine3.length,this.textLine3.length+1);
				}
			}
			if(this.textLine1.length==this.textStrings[this.conversationPosition].length && this.textLine2.length==this.textStrings[this.conversationPosition+1].length && this.textLine3.length==this.textStrings[this.conversationPosition+2].length)
			{
				this.populating=false;
			}
		}
		else
		{
			if(ig.input.pressed('interact'))
			{
				if(this.conversationPosition+3<this.textStrings.length)
				{
					this.conversationPosition+=3;
					this.textLine1="";
					this.textLine2="";
					this.textLine3="";
					this.populating=true;
				}
				else
				{
					ig.game.isPaused=false;
					this.kill();
				}
			}
		}		
		this.parent();
	},
	draw: function()
	{
		this.parent();
		var drawX = this.pos.x+12 - ig.game.screen.x;
		var drawY = this.pos.y+11 - ig.game.screen.y;
		ig.game.font.draw(this.textLine1, drawX, drawY);
		ig.game.font.draw(this.textLine2, drawX, drawY+10);
		ig.game.font.draw(this.textLine3, drawX, drawY+20);
		ig.game.font.draw(this.textLine4, drawX, drawY+30);
		/*ig.system.context.font="10px System";
		ig.system.context.fillStyle="#FFFFFF";
		ig.system.context.fillText('test', ig.input.mouse.x*2, ig.input.mouse.y*2);*/
		/*ig.game.font.draw(this.textLine1, this.pos.x, this.pos.y, ig.Font.ALIGN.LEFT );
		ig.game.font.draw(this.textLine2, this.pos.x, this.pos.y, ig.Font.ALIGN.LEFT );*/
		
		/*ig.game.font.draw(this.textLine4, ig.game.screen.x, ig.game.screen.y, ig.Font.ALIGN.LEFT );*/
	}
});
});