var EditorView = Backbone.View.extend({
		
	el: '#botmenu-editors-container',

	render: function(){

		this.$el.html('<fieldset>\
							<legend>Parameters</legend>\
							<span name="type"></span>\
							<select name="draggable">\
								<option value="true">True</option>\
								<option value="false">False</option>\
							<select>\
							<div name="position-x"></div>\
							<div name="position-y"></div>\
							<div name="width"></div>\
							<div name="height"></div>\
						</fieldset>');
		this.stickit();
		return this;
	},
	bindings: {
	    '[name="type"]': 'type',
	    '[name="position-x"]': 'x',
	    '[name="position-y"]': 'y',
	    '[name="width"]': 'width',
	    '[name="height"]': 'height',
	    '[name="draggable"]': 'draggable'
	},
	initialize: function() {
		this.model = new ComponentModel();
    	this.render();
  	},
	setModel: function( model ) {
    	
    	this.unstickit();
    	this.model = model;
    	this.render();
    	
  	}
});

// Widoki dla edytorów
var TextEditorView = EditorView.extend();
textEditorView = new TextEditorView( );

var ImageEditorView = EditorView.extend();
imageEditorView = new ImageEditorView(  );

var VideoEditorView = EditorView.extend();
videoEditorView = new VideoEditorView( );

var QuizEditorView = EditorView.extend();
quizEditorView = new QuizEditorView(  );

var CrosswordEditorView = EditorView.extend();
crosswordEditorView = new CrosswordEditorView(  );