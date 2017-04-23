var ScrollerModel = ComponentModel.extend({

	defaults: function(){
        return _.extend({}, ComponentModel.prototype.defaults(),
         {
         	type:"scroller",
         	action: 99,
         	width : 30,
	    	height : 30,
	    	adv : 'none',
	    	scrollTime: 2
         }
        )
    },

    pastePosition: function(dimensions){

    },

    pasteDimension: function(dimensions){

    },

    pasteTrigger: function(dimensions){

    },

    pasteStyle: function(dimensions){

    }
});