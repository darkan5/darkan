var UploadZbitWindowModel = WindowModel.extend({

	defaults: function(){
      return _.extend({}, WindowModel.prototype.defaults,
         {
         	modal: true,
			draggable : false
         }
       )
    }
});