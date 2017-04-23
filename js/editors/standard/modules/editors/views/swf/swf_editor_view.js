var SwfEditorView = EditorView.extend({
	template: _.template($('#swf-editor-template').html()),

    events: function(){
        return _.extend({},EditorView.prototype.events,{
            'click .add-swf-file': 'addSwfToComponent'
        });
    },

	bindings: {

	},

    addSwfToComponent: function() {
        this.model.view.uploadOnClick();
    },

    afterRender: function() {
    	var swfFileName = this.model.get('swfFileName');

        var actionkey = this.model.get('actionkey');
        var swfPath = 'projects/'+__meta__.ownerID+'/'+__meta__.projectID+'/pre/exported_view/'+actionkey.split('-').pop()+'/swf/'+actionkey+'/'+swfFileName;
        this.$el.find('.editor-swf-container').flash(swfPath);
    },

    onSetModel: function() {
    	this.listenTo(this.model, 'change:swfFileName', this.render );
    }

    // onBeforeInitialize: function() {

    // 	this.listenTo(this.model, 'change:swfFileName', this.afterRender );
    // }
});