var WcagEditorView = EditorView.extend({

	//el: '#botmenu-wcag',

	template: _.template($('#wcag-editor-template').html()),

//    events: function(){
//        return _.extend({},EditorView.prototype.events,{
//
//        });
//    },

    bindings: {
        '.wcag-editor-consider': {
        	observe: 'wcag',
        	afterUpdate: function(val) {
        		this.render();
        		return val;
        	},
        	onSet: function(val) {
        		this.render();
        		return val;
        	}
        },
        '.wcag-editor-to-read': 'wcagMessage'
    },

    onSetModel: function() {
        this.render();
    }
});