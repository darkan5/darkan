var InfoPointPopupModel = ImageModel.extend({

	defaults: function(){
      return _.extend({}, ComponentModel.prototype.defaults(),
         {
         	type:"infopoint-popup",
         	action: 99,
         	width : 100,
	    	height : 100,
	    	title: _lang('INFOPOINT_POPUP_TITLE_DEFAULT'),
	    	text: _lang('INFOPOINT_POPUP_MESSAGE_DEFAULT'),
            imageFileName: '',
            library: 'buttons/info',
            rand: 0,
            opacity : 1
         }
      )
   },

//    pasteDimension: function(dimensions){
//
//    }
});