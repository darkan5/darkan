var InfoPointDownloadEditorView = ImageEditorView.extend({
	template: _.template($('#infopointdownload-editor-template').html()),

    events: function(){
        return _.extend({},EditorView.prototype.events,{
            'click .add-download-file': 'addFile',
            'click .editor-delete-file-file': 'deleteFile',

            'change input[name="opacity"]': 'onOpacityChanged',
            'click .add-image-file': 'addNewImage',
            'click .editor-crop-image-button': 'showCropWindow',
            'click .editor-resize-to-stage-button': 'resizeToStage',
            'click .editor-original-size-button': 'originalSize',
            'click .editor-add-border-button': 'showBorderWindow'
        });
    },

	bindings: {
        '#use-new-download-file-name' : 'useNewDownloadFileName',
        '#new_download_file_name' : 'newDownloadFileName',
	},

	onSetModel: function() {
		this.listenTo(this.model, 'change:sound', this.render);
		this.listenTo(this.model, 'change:fileToDownload', this.render);
	},

	deleteFile: function() {

		var actionkey = this.model.get('actionkey');
		var fileName = this.model.get('fileToDownload');

		this.deleteFileOnServer(actionkey, fileName);

	},

	deleteFileOnServer: function(actionkey, fileName) {


        var _that = this;

        DataAccess.updateComponents(
            {
                page: StageView.instance.model, 
                components:[_that.model],
                action:"delete-file-file", 
                fileName:fileName, 
                actionkey:actionkey,
                pageId:StageView.instance.model.getPageId()
            },
            function(data) {

                _log('Update component result: ', data, _log.dataaccessOutResult); 

                _that.model.set('fileToDownload', '', { silent:true });
                _that.render();

            },
            function(data) { 
                _log('Update component fault: ', data, _log.dataaccessOutFault); 
            }
        );
	},

	addFile: function(e) {
        this.model.setComponentAsDownload();
        this.model.view.uploadOnClick();
	}
});