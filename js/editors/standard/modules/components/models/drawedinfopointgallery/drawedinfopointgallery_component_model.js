var DrawedInfoPointGalleryModel = InfoPointGalleryModel.extend({

	defaults: function(){
      return _.extend({}, InfoPointGalleryModel.prototype.defaults(),
         {
         	type:"drawedinfopoint-gallery",
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