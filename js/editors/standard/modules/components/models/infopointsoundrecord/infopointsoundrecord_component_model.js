var InfoPointSoundRecordModel = ImageModel.extend({

	defaults: function(){
      return _.extend({}, ComponentModel.prototype.defaults(),
         {
         	type:"infopoint-soundrecord",
         	action: 99,
         	width : 100,
	    	height : 100,
            imageFileName: '',
            library: '',
            rand: 0,
            opacity : 1
         }
      )
   },

//    pasteDimension: function(dimensions){
//
//    }
});