var LoadedItemPageView = PageItemView.extend({

   events: function(){
       return _.extend({},PageItemView.prototype.events,{

           'dragenter': 'onFileDragOver',
           'dragleave .loaded-dropzone': 'onFileDragOut',
           'drop .loaded-dropzone': 'uploadOnFileDrop'
       });
   },


    onFileDragOver: function(e) {
        e.stopPropagation();
        this.$el.find('.loaded-dropzone').fadeIn(200);
    },

    onFileDragOut: function(e) {
        e.stopPropagation(e);
        this.$el.find('.loaded-dropzone').fadeOut(200);
    },

    getAcceptTypeFormat: function(){
        return this.model.get('options').getAcceptTypeFormat();
    },

    getDropProperties: function(e){

        var imageUrl;

        var file = e.originalEvent.dataTransfer.files[0];

        var data;

        if(file != undefined){
            var imageName = file.name;
            var imageData = e.originalEvent.dataTransfer.result;

            data = {
                name: imageName,
                data : imageData,
                size: file.size
            };
        }else{

            imageUrl =  e.originalEvent.dataTransfer.getData('text');
        }

        return { file: file, data:data, imageUrl:imageUrl };
    },

    uploadOnPaste: function(e, blob, resizeImage){

        var _that = this;

        if(!StageView.instance.canEdit) { return; }
        if(this.model.get('locked')) { return; }

        this.resizeImage = resizeImage;

        var reader = new FileReader();
        reader.onload = function(e){

            var data = {
                name: 'copyimage.png',
                data : event.target.result,
                size: blob.size
            };

            _that.runUploadProcess( { file:blob, data:data } );

        }; // data url!
        reader.readAsDataURL(blob);
    },

    getInputProperties: function(e, input){
        return FileUploader.getInputProperties(e, input);
    },

    uploadOnClick: function() {

        var _that = this;

        var acceptTypeFormat = this.getAcceptTypeFormat();

        var input = $('<input type="file" name="files[]" accept="'+ acceptTypeFormat +'">');
        input.css({
            display: 'none'
        });

        this.$el.append(input);
        input.click();

        input.change(function(e) {

            _that.uploadOnInputData(e, this, false);

            $(this).remove();
        });
    },

    uploadOnFileDrop: function(e, resizeImage) {

        if(Utils.isDarkanExtension(e)){
            return;
        };

        if(!StageView.instance.canEdit) { return; }

        this.resizeImage = resizeImage;
        this.$el.find('.loaded-dropzone').fadeOut(500);
        var properties = this.getDropProperties(e);

        var imageUrl = properties.imageUrl;

        if(imageUrl != undefined){
            this.uploadOnLink(imageUrl, resizeImage);
        }else{
            this.runUploadProcess( properties );
        }
    },

    createLoaderImage: function(){

        var img = $('<img>');
        img.attr('src', 'content_template/css/gif-load.gif');
        img.addClass('page-item-loader-link');

        return img;
    },

    uploadOnLink: function(imageUrl, resizeImage){

        if(!StageView.instance.canEdit) { return; }
        if(this.model.get('locked')) { return; }

        this.resizeImage = resizeImage;

        var _that = this;

        var img = this.createLoaderImage();
        this.$el.append(img);

        DataAccess.convertLinkToImage({
                imageUrl:imageUrl, pageId: StageView.instance.model.get('options').get('pageid') },
            function(data){

                _that.$el.find('.page-item-loader-link').remove();

                _that.model.get('options').set('image', data.fileName);

                //StageView.instance.renderBackgroundImage();

                //StageView.instance.model.updateDinamicPageThumb();

//                _that.model.forceRender();
//
//                if(_that.resizeImage){
//                    _that.resizeImageToProperDimentions();
//                }
            },
            function(data){

                _that.$el.find('.page-item-loader-link').remove();

            }
        );
    },

    uploadOnInputData: function(e, input, resizeImage) {

        this.resizeImage = resizeImage;

        var properties = this.getInputProperties(e, input);

        this.runUploadProcess( properties );
    },

    runUploadProcess :function( properties ){

        if(this.model.get('options').uploadingNow){
            return;
        }

        var specialData = this.getSpecialProperties();
        var toSend = $.extend({}, properties, specialData);

        this.fileUploader =  FileUploader.create( properties.data.name, this.model.get('options'), this );

        if(this.fileUploader == undefined){

            this.showPupup({ content:_lang('FILETYPE_NOT_ACCEPTED'), title:_lang('MODAL_INFO_ERROR') }, this);
            return;
        }

        this.fileUploader.sendFile( toSend );
        this.fileUploader.on('on-result', this.onResult,  this);
        this.fileUploader.on('on-fault', this.onFault,  this);
        this.fileUploader.on('on-complete', this.onComplete,  this);
        this.fileUploader.on('on-progress', this.onProgress,  this);

    },

    onResult: function(data) {

        if(data.key == 1){
            this.showPupup({ content:_lang('FILETYPE_NOT_ACCEPTED'), title:_lang('MODAL_INFO_ERROR') }, this);
            return;
        }
    },

    onFault: function(data) {

        this.showPupup({ content:_lang('FILETYPE_NOT_ACCEPTED'), title:_lang('MODAL_INFO_ERROR') }, this);
    },

    showPupup :function(data, sender){

        var popup = PopupFactory.createErrorPopup( data, sender );

        $('body').append(popup.render(data).$el);
    },

    onComplete: function(data) {

        var _that = this;

        this.hideProgressPercent(data);
        //this.render({ pageModel: this.model.toJSON() });

        this.model.updatePagethumb();

        this.fileUploader.off();
        this.fileUploader = undefined;

        setTimeout(function(){
            _that.model.updateDinamicPageThumb();
        }, 100);
    },

    onProgress: function(data) {
        this.showProgressPercent( data );
    },

    getSpecialProperties: function() {
        return {};
    },

    showProgressPercent :function(data){

        FileUploader.showProgressPercent(data, this);
    },

    hideProgressPercent :function(data){

        FileUploader.hideProgressPercent(data, this);
    },

    openImageWindow: function() {
        var _that = this;

        var sender = this;
        var activeTab = 0;

        var imageWindow = WindowFactory.createImageWindow(activeTab, _that.model.view);

        imageWindow.on('on-close', function(fileData) {
            _that.imageWindow = undefined;
        });

        imageWindow.on('imageupload-ondrop', function(fileData) {
            //var componentView = _that.addComponent( 'image', true );
            _that.model.view.uploadOnFileDrop(fileData, true);
        });

        imageWindow.on('imageupload-onclick', function(fileData, input) {
            //var componentView = _that.addComponent( 'image', true );
            _that.model.view.uploadOnInputData(fileData, input, true);
        });

        imageWindow.on('imageupload-link', function(imageUrl) {
            //var componentView = _that.addComponent( 'image', true );
            _that.model.view.uploadOnLink(imageUrl, true);
        });

        imageWindow.on('imageupload-on-paste', function(event, blob) {
            //var componentView = _that.addComponent( 'image', true );
            _that.model.view.uploadOnPaste(event, blob, true);
        });

        $('body').append(imageWindow.render().$el);
        imageWindow.$el.find('.darkan-tabs').tabs("option", "active", activeTab);

        this.imageWindow = imageWindow;
    },
});