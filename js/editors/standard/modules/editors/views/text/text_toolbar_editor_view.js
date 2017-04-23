var TextToolbarEditorView = EditorView.extend({

	el: $('menu-text'),

	bindings: {
	    // '[class="enable-scrollbar"]': 'enable-scrollbar'
	},
	events: {
  		// 'change .enable-scrollbar': 'onEnableScrollbar'
    },

    onSetModel: function() {
        this.render()
    }

});