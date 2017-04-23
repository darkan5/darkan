var InfoPointLinkModel = ImageModel.extend({

	defaults: function(){
      return _.extend({}, ComponentModel.prototype.defaults(),
         {
         	type:"infopoint-link",
         	action: 99,
         	width : 100,
	    	   height : 100,
            link: '',
            openInIframe: false,
            imageFileName: '',
            library: 'buttons/link',
            rand: 0,
            opacity : 1
         }
      )
   },

//    pasteDimension: function(dimensions){
//
//    }
});