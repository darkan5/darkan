var DrawedInfoPointPopupModel = InfoPointPopupModel.extend({

	defaults: function(){
      return _.extend({}, InfoPointPopupModel.prototype.defaults(),
         {
         	type:"drawedinfopoint-popup",
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