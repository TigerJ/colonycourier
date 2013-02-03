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
	animSheet: new ig.AnimationSheet( 'media/images/hud.png', 320, 32 ),	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.addAnim( 'idle', 1, [0] );
	},
	update: function() {
		this.parent();
		this.pos.x=ig.game.screen.x;
		this.pos.y=ig.game.screen.y;
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