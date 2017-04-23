var IframeEditorView = EditorView.extend({
	template: _.template($('#iframe-editor-template').html()),

    changeLinkTimeout: null,

  	events: {
        'keyup .iframe-obj-editor-input' : 'changeLink'
    },

	bindings: {

	},

    changeLink: function(e) {
        var _that = this;
        
        var link = $(e.target).val();

        clearTimeout(this.changeLinkTimeout);
        this.changeLinkTimeout = setTimeout(function() {
            _that.model.set('link', link);
        }, 1000);
    }
});