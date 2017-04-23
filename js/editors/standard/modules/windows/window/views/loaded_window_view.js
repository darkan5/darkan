var LoadedWindowView = WindowView.extend({

//    events: function(){
//        return _.extend({},WindowView.prototype.events,{
//
//            // 'dragenter': 'onFileDragOver',
//            // 'dragleave .loaded-dropzone': 'onFileDragOut',
//            // 'drop .loaded-dropzone': 'uploadOnFileDrop'
//        });
//    },


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
        return FileUploader.getDropProperties(e);
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

        this.resizeImage = resizeImage;

        this.$el.find('.loaded-dropzone').fadeOut(500);

        var properties = this.getDropProperties(e);

        this.runUploadProcess( properties );
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

        this.fileUploader =  FileUploader.create( properties.data.name, this.model, this );

        if(this.fileUploader == undefined){

            this.showPupup({ message:_lang('FILETYPE_NOT_ACCEPTED') }, this);
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
            this.showPupup({message:_lang('FILETYPE_NOT_ACCEPTED')}, this);
            return;
        }
    },

    onFault: function(data) {

        this.showPupup(data, this);
    },

    showPupup :function(data, sender){

        var popup = PopupFactory.createErrorPopup( data, sender );

        $('body').append(popup.render(data).$el);
    },

    onComplete: function(data) {

        this.hideProgressPercent(data);
        this.renderAfterComplete(data);

        this.fileUploader.off();
        this.fileUploader = undefined;
    },

    renderAfterComplete: function() {

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
    }
});