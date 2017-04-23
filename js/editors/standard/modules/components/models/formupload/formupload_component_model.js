var FormUploadModel = ImageModel.extend({

	defaults: function(){
      return _.extend({}, ComponentModel.prototype.defaults(),
         {
         	type:"form-upload",
            action: 99,
            width : 100,
            height : 100,
            imageFileName: '',
            library: 'buttons/link',
            rand: 0,
            opacity : 1,
            goodExtensions: ''
         }
      )
   },

});