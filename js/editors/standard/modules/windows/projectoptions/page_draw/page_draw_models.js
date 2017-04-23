var PageDrawModel = Backbone.Model.extend({
    defaults:{
    	opts: {
    		amountToDraw: 0
    	},
    	pagesToDraw: [ ]
    }
});

var PageDrawCollection = Backbone.Collection.extend({
    model: PageDrawModel
});