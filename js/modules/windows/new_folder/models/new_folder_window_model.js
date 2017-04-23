var NewFolderWindowModel = WindowModel.extend({

	defaults: function(){
      return _.extend({}, WindowModel.prototype.defaults,
         {
         	modal: true,
			draggable : false,
			enableOkButton : true,
			enableCancelButton : true,
			enableNameInput : true
         }
       )
    }
});