var InfoPointSoundControlEditorView = EditorView.extend({
	template: _.template($('#infopointsoundcontrol-editor-template').html()),

    events: function(){
        return _.extend({},EditorView.prototype.events,{
            'click .add-sound-file' : 'addSound',
            'click .editor-delete-sound-file': 'deleteFileSound',
        });
    },

	bindings: {
		'#soundcontrol-noskin': 'noskin'
	},

	onSetModel: function() {
		var _that = this;
		this.listenTo(this.model, 'change:sound', this.render);
	},

	soundVolume: function (e) {

		var volume = parseInt($(e.target).val());


		this.model.set('volume', volume);

	},

	deleteFileSound: function() {

		var actionkey = this.model.get('actionkey');
		var fileName = this.model.get('sound');

		this.deleteFileSoundOnServer(actionkey, fileName);

	},

	deleteFileSoundOnServer: function(actionkey, fileName) {


        var _that = this;

        DataAccess.updateComponents(
            {
                components:[_that.model],
                action:"delete-file-sound", 
                fileName:fileName, 
                actionkey:actionkey,
                pageId:StageView.instance.model.getPageId()
            },
            function(data) {

                _log('Update component result: ', data, _log.dataaccessOutResult);  

                _that.model.set('sound', '', { silent:true });
                _that.model.set('point-sound', '', { silent:true });
                _that.render();

            },
            function(data) { 
                _log('Update component fault: ', data, _log.dataaccessOutFault);  
            }
        );
	},

	addSound: function(e) {
        this.model.setComponentAsSound();
		this.model.view.uploadOnClick();
	},
});