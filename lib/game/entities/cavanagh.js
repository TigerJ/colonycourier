ig.module(
	'game.entities.cavanagh'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityCavanagh = ig.Entity.extend({
	size: {x: 8, y:8},
	gravityFactor:0,
	type: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.NEVER,
	animSheet: new ig.AnimationSheet( 'media/images/ability2.png', 8, 8 ),
	turnOff:false,
	name:'',
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.addAnim('lvl_8',1,[8]);//out
		this.addAnim('lvl_7',1,[7]);
		this.addAnim('lvl_6',1,[6]);
		this.addAnim('lvl_5',1,[5]);
		this.addAnim('lvl_4',1,[4]);
		this.addAnim('lvl_3',1,[3]);
		this.addAnim('lvl_2',1,[2]);
		this.addAnim('lvl_1',1,[1]);
		this.addAnim('lvl_0',1,[0]);//full
		this.pos.x=ig.game.screen.x+128;
		this.pos.y=ig.game.screen.y+18;
	},
	update: function() {
		this.parent();
		this.pos.x=ig.game.screen.x+128;
		this.pos.y=ig.game.screen.y+18;
		switch(ig.game.CavanaghQty)
		{
			case 10:
			case 9:
				this.currentAnim = this.anims.lvl_0;
			break;
			case 8:
				this.currentAnim = this.anims.lvl_1;
			break;
			case 7:
				this.currentAnim = this.anims.lvl_2;
			break;
			case 6:
				this.currentAnim = this.anims.lvl_3;
			break;
			case 5:
				this.currentAnim = this.anims.lvl_4;
			break;
			case 4:
				this.currentAnim = this.anims.lvl_5;
			break;
			case 3:
				this.currentAnim = this.anims.lvl_6;
			break;
			case 2:
			case 1:
				this.currentAnim = this.anims.lvl_7;
			break;
			case 0:
				this.currentAnim = this.anims.lvl_8;
			break;
		}
	}
});
});