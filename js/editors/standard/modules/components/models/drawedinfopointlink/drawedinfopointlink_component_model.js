var DrawedInfoPointLinkModel = InfoPointLinkModel.extend({

	defaults: function(){
      return _.extend({}, InfoPointLinkModel.prototype.defaults(),
         {
         	type:"drawedinfopoint-link",
         	action: 99,
         	width : 150,
	    	   height : 100,
            activeBorderColor: '#A80000',
            deactiveBorderColor: '#00FF33',
            showShadow: false,
            borderSize: 2
         }
       )
      }
});