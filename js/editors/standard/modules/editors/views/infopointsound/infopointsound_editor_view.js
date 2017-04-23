var InfoPointSoundEditorView = ImageEditorView.extend({
	template: _.template($('#infopointsound-editor-template').html()),

    events: function(){
        return _.extend({},EditorView.prototype.events,{
            'click .add-sound-file' : 'addSound',
            'click .editor-delete-sound-file': 'deleteFileSound',
            'change input[name="sound-volume"]': 'soundVolume',

            'change input[name="opacity"]': 'onOpacityChanged',
            'click .add-image-file': 'addNewImage',
            'click .editor-crop-image-button': 'showCropWindow',
            'click .editor-resize-to-stage-button': 'resizeToStage',
            'click .editor-original-size-button': 'originalSize',
            'click .editor-add-border-button': 'showBorderWindow'
        });
    },

	bindings: {
	},

	onSetModel: function() {
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
                page: StageView.instance.model, 
                components:[_that.model],
                action:"delete-file-sound", 
                fileName:fileName, 
                actionkey:actionkey,
                pageId:StageView.instance.model.getPageId()
            },
            function(data) {

                _that.model.set('sound', '');
                _that.render();

            },
            function(data) { _log('Update component fault: ', data, _log.dataaccessOutFault)  }
        );
	},

	addSound: function(e) {
        this.model.setComponentAsSound();
		this.model.view.uploadOnClick();
	},
});