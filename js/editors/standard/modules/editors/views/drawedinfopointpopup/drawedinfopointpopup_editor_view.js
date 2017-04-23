var DrawedInfoPointPopupEditorView = InfoPointPopupEditorView.extend({
	template: _.template($('#drawedinfopointpopup-editor-template').html()),

    events: function(){
        return _.extend({},EditorView.prototype.events,{
            'keyup input[name="editor-border-size-input"]': 'changeBorderSize',
            'click input[name="editor-shadow-checkbox"]': 'changeShowShadow'
        });
    },

    changeShowShadow: function(e) {
        var showShadow = $(e.target).is(':checked');
        this.model.set('showShadow', showShadow);
    },

    changeBorderSize: function(e) {
        var borderSize = parseInt($(e.target).val());
        this.model.set('borderSize', borderSize);
    }
});