var ComponentModel = Backbone.Model.extend({

	defaults:function(){
        return {
            actionkey: null,
    		type:"",
    		x: 10,
    		y: 10,
            compl: 0,
    		action: 99,
        	width : 0,
        	height : 0,
            draggable : true,
            aspectRatio : false,
            aspectRatioProportions : 0,
    		'require-credit' : false,
    		'credit-points' : 0,
            'selected-by': -1,
            triggers: [],
            'point-sound' : '',
            'volume': 100,
            autoplaySound: true,
            title : '',
            wcag : false,
            wcagMessage : '',
            lifetime: 0,
            showtime: 0,
            hidden: false,
            locked: false,
            flipX: 'xnormal',
            flipY: 'ynormal',
            opacity : 1,
            animations: {
                animIn: {
                    animationName: 'none',
                    animationPrettyName: 'none',
                    animationTime: 1.3
                },
                animOut: {
                    animationName: 'none',
                    animationPrettyName: 'none',
                    animationTime: 1.3
                },
                animOver: {
                    animationName: 'none',
                    animationPrettyName: 'none',
                    animationTime: 1.3
                },
                animEndless: {
                    animationName: 'none',
                    animationPrettyName: 'none',
                    animationTime: 1.3
                }
            }
        }
	},

	initFromJSON: function(json) {
		
	},
});

var ComponentsCollection = Backbone.Collection.extend({
	model: ComponentModel
});