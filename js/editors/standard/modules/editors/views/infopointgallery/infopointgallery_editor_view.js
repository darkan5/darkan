var InfoPointGalleryEditorView = ImageEditorView.extend({
	template: _.template($('#infopointgallery-editor-template').html()),

    events: function(){
        return _.extend({},EditorView.prototype.events,{
            'click .gallery-file-delete' : 'deleteFile',
            'click .add-gallery-file': 'addGalleryFile',

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
  		this.model.off('set-gallery-file');
  		this.model.on('set-gallery-file', this.render, this);

        this.model.off("update-editor");
        this.model.on("update-editor",  this.render, this);
  	},

  	addGalleryFile: function() {
        this.model.setComponentAsGallery();
        this.model.view.uploadOnClick();
  	},

	deleteFile: function(e) {


    var _that = this;

		// var index = parseInt($(e.target).attr('index'));
		// var galleryFiles = this.model.get('galleryFiles');
		//var actionkey = this.model.get('actionkey');
		//var fileName = galleryFiles[index];

		// galleryFiles.splice(index, 1);


		// this.model.set('galleryFiles', galleryFiles);
		// this.model.trigger('change');



		//this.deleteFileGalleryOnServer(actionkey, fileName);

		//this.render();

    var index = parseInt($(e.target).attr('index'));
    var galleryFiles = this.model.get('galleryFiles');
    var actionkey = this.model.get('actionkey');
    var fileName = galleryFiles[index];


        

        DataAccess.updateComponents(
            {
              page: StageView.instance.model, 
              components:[_that.model],
              action:"delete-file-gallery", 
              fileName:fileName, 
              actionkey:actionkey,
              pageId:StageView.instance.model.getPageId()
            },
            function(data) {
              _log('Update component result: ', data, _log.dataaccessOutResult); 

              var component = data.components[0];

              _that.model.set('galleryFiles', component.galleryFiles, { silent:true });

              _that.render();
            },
            function(data) { 
              _log('Update component fault: ', data, _log.dataaccessOutFault);
            }
        );
	},

	// deleteFileGalleryOnServer: function(actionkey, fileName) {

 //    var index = parseInt($(e.target).attr('index'));
 //    var galleryFiles = this.model.get('galleryFiles');
 //    var actionkey = this.model.get('actionkey');
 //    var fileName = galleryFiles[index];


 //        var _that = this;

 //        DataAccess.updateComponents(
 //            {
 //              page: StageView.instance.model, 
 //              components:[_that.model],
 //              action:"delete-file-gallery", 
 //              fileName:fileName, 
 //              actionkey:actionkey,
 //              pageId:StageView.instance.model.getPageId()
 //            },
 //            function(data) {
 //              _log('Update component fault: ', data, _log.dataaccessOutResult); 

 //              _that.render();
 //            },
 //            function(data) { 
 //              _log('Update component fault: ', data, _log.dataaccessOutFault);
 //            }
 //        );
	// }
});