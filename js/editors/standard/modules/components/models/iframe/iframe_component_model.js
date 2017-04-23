var IframeModel = ComponentModel.extend({

	defaults: function(){
		return _.extend({}, ComponentModel.prototype.defaults(),
         {
         	type:"iframe",
         	action: 99,
         	width : 150,
	    	height : 100,
            link: ''
         }
    	)
	}
});