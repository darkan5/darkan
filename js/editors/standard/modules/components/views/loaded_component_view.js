var LoadedComponentView = ComponentView.extend({

    resizeImage: false,

    events: function(){
        return _.extend({},ComponentView.prototype.events,{
            'click .upload': 'uploadOnClick',
            'dragenter': 'onFileDragOver',
            'dragleave .loaded-dropzone': 'onFileDragOut',
            'drop .loaded-dropzone': 'uploadOnFileDrop'
        });
    },

    onFileDragOver: function(e) {

        if(!StageView.instance.canEdit) { return; }
        if(this.model.get('locked')) { return; }

        e.stopPropagation();
        this.$el.find('.loaded-dropzone').fadeIn(200);
    },

    onFileDragOut: function(e) {

        if(!StageView.instance.canEdit) { return; }
        if(this.model.get('locked')) { return; }

        e.stopPropagation(e);
        this.$el.find('.loaded-dropzone').fadeOut(200);
    },

    getAcceptTypeFormat: function(){
        return this.model.getAcceptTypeFormat();
    },

    getDropProperties: function(e){
        return FileUploader.getDropProperties(e);
    },

    getInputProperties: function(e, input){
        return FileUploader.getInputProperties(e, input);
    },


    showImageWindow: function(){
         this.trigger('show-image-window', this)
    },

    uploadOnClick: function() {

        if(!StageView.instance.canEdit) { return; }

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

    uploadOnInputData: function(e, input, resizeImage) {

        this.resizeImage = resizeImage;

        var properties = this.getInputProperties(e, input);

        this.runUploadProcess( properties );
    },

    uploadOnFileDrop: function(e, resizeImage) {

        if(Utils.isDarkanExtension(e)){
            return;
        };

        e.stopPropagation(e);
        e.preventDefault();

        if(!StageView.instance.canEdit) { return; }

        this.resizeImage = resizeImage;

        this.$el.find('.loaded-dropzone').fadeOut(500);

        var properties = this.getDropProperties(e);

        this.runUploadProcess( properties );

    },


    runUploadProcess :function( properties ){

        if(this.model.uploadingNow){
            return;
        }

        _log('runUploadProcess', properties);

        //var specialData = this.getSpecialProperties();
        //var toSend = $.extend({}, properties, specialData);
        properties.specialData = this.getSpecialProperties();



        this.fileUploader =  FileUploader.create( properties.data.name, this.model, this );

        if(this.fileUploader == undefined){

            this.showPupup({ content:_lang('FILETYPE_NOT_ACCEPTED'), title: _lang('MODAL_INFO_ERROR') }, this);
            return;
        }

        if(this.fileUploader.isUploadingNow()){

        }

        this.fileUploader.sendFile( properties );
        this.fileUploader.on('on-result', this.onResult,  this);
        this.fileUploader.on('on-fault', this.onFault,  this);
        this.fileUploader.on('on-complete', this.onComplete,  this);
        this.fileUploader.on('on-progress', this.onProgress,  this);
    },

    onResult: function(data) {

        if(data.key == 1){
            this.showPupup({content:_lang('FILETYPE_NOT_ACCEPTED'), title: _lang('MODAL_INFO_ERROR')}, this);
            return;
        }
    },

    onFault: function(data) {

        this.showPupup({content:_lang('ERROR_ON_UPLOAD'), title: _lang('MODAL_INFO_ERROR')}, this);
    },

    onComplete: function(data) {

        this.hideProgressPercent(data);

        this.fileUploader.off();
        this.fileUploader = undefined;

        this.afterOnComplete();

    },

    afterOnComplete: function() {
        // to override
    },

    onProgress: function(data) {
        this.showProgressPercent( data );
    },

    showProgressPercent :function(data){

        FileUploader.showProgressPercent(data, this);
    },

    hideProgressPercent :function(data){

        FileUploader.hideProgressPercent(data, this);
    },

    showPupup :function(data, sender){

        var popup = PopupFactory.createErrorPopup( data, sender );
        $('body').append(popup.render(data).$el);
    },

    getSpecialProperties: function() {
        return {};
    }

});
