var ImageEditorView = EditorView.extend({

	template: _.template($('#image-editor-template').html()),

	bindings: {
	    '[name="opacity"]': 'opacity'
	},

    events: function(){
        return _.extend({},EditorView.prototype.events,{
            'change input[name="opacity"]': 'onOpacityChanged',
            'click .add-image-file': 'addNewImage',
            'click .editor-crop-image-button': 'showCropWindow',
            'click .editor-resize-to-stage-button': 'resizeToStage',
            'click .editor-original-size-button': 'originalSize',
            'click .editor-add-border-button': 'showBorderWindow',
            'click .edit-image-file': 'editImage'
        });
    },

    showBorderWindow: function() {
        this.model.view.addBorder();
    },

    editImage: function(){

        var photopeaWindowView = WindowFactory.createPhotopeaWindow({  componentModel:this.model });
        $('body').append(photopeaWindowView.render().$el);
    },

    resizeToStage: function() {

        var pageWidth = StageView.instance.model.get('options').get('width');
        var pageHeight = StageView.instance.model.get('options').get('height');

        this.model.set('x', 0);
        this.model.set('y', 0);
        this.model.set('width', pageWidth);
        this.model.set('height', pageHeight);

        this.model.view.createMiniature();

        this.render();
    },

    originalSize: function() {

        var _that = this;

        var pageID = StageView.instance.model.get('options').get('pageid');
        var actionkey = this.model.get('actionkey');
        var fileName = this.model.get('imageFileName');

        DataAccess.getImageSize(
            { pageID: pageID, actionkey: actionkey, fileName: fileName },
            function(data) {


                var dim = data.size.split('x');
                var width = parseInt(dim[0]);
                var height = parseInt(dim[1]);

                _that.model.set('width', width);
                _that.model.set('height', height);

                _that.model.view.createMiniature();

            },
            function(data) { _log('data', data) }
        );

    },

    resizeImage: function() {

        var pageID = StageView.instance.model.get('options').get('pageid');
        var actionkey = this.model.get('actionkey');
        var fileName = this.model.get('imageFileName');
        var width = this.model.get('width');
        var height = this.model.get('height');


        DataAccess.resizeImage(
            { pageID: pageID, actionkey: actionkey, fileName: fileName, width: width, height: height },
            function(data) {


            },
            function(data) { _log('data', data) }
        );

    },

    showCropWindow: function() {

        var _that = this;

        this.model.view.showCropWindow();
    },

    addNewImage: function() {

        this.model.setComponentAsImage();
        this.model.view.showImageWindow();
    },

    onSetModel: function() {
        this.listenTo(this.model, 'change:imageFileName', this.render );
        // this.listenTo(this.model, 'change:opacity')
    },

    onOpacityChanged: function(e){



    	var value = $(e.target).val();

        _log('onOpacityChanged', value);


    	this.model.set('opacity', value);
    }
});