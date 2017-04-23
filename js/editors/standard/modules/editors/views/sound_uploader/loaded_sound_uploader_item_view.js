var LoadedSoundUploaderView = EditorView.extend({

   events: function(){
        return _.extend({},EditorView.prototype.events,{
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
        return this.model.getAcceptTypeFormat();
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

    uploadOnInputData: function(e, input, resizeImage) {

        this.resizeImage = resizeImage;

        var properties = this.getInputProperties(e, input);

        this.runUploadProcess( properties );
    },

    runUploadProcess :function( properties ){

        if(this.model.uploadingNow){
            return;
        }

        var specialData = this.getSpecialProperties();
        var toSend = $.extend({}, properties, specialData);

        this.fileUploader =  new ProjectSoundUploader();//FileUploader.create( properties.data.name, this.model, this );
        this.fileUploader.setView(this.model);
        this.fileUploader.setView2(this);


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

        this.fileUploader.off();
        this.fileUploader = undefined;

        this.render();
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
});