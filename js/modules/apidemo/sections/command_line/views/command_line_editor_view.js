var CommandLineEditorView = CommandLineView.extend({

	template: _.template($('#command-line-editor-template').html()),

    initialize: function(){

    },
    
    serializeData: function(){
    	return {};
    }
});