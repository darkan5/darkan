var TextModel = ComponentModel.extend({

	defaults: function(){
        return _.extend({}, ComponentModel.prototype.defaults(),
         {
         	type:"text",
         	action: 99,
         	width : 300,
	    	height : 120,
            padding: 10,
            contents: '<span style="font-size:18px">'+_lang('SIMPLETEXT_INSERTTEXT')+'</span>',
         	'enable-scrollbar' : false,
            bgcolor: ''
         }
        )
    },

    setTextEditor: function(el) {
    	this.trigger('set-text-editor', el);
    }

});