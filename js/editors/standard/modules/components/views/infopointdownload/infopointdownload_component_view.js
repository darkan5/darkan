var InfoPointDownloadComponentView = ImageComponentView.extend({

	className : 'component infopointdownload-component',

	template: _.template($('#infopointdownload-component-template').html()),

    // events: function(){
    //     return _.extend({},ComponentView.prototype.events,{
    //         'keyup input': 'changeValue'
    //     });
    // },

    // bindings: {
    // 	'input': 'placeholder'
    // },

//    addComponentListeners :function(){
//
//    },

//    makeResizable: function() {
//        return false;
//    }

    uploadOnDownloadFileDrop: function(e, resizeImage) {

        if(!StageView.instance.canEdit) { return; }

        this.model.setComponentAsDownload();

        this.resizeImage = resizeImage;
        this.$el.find('.loaded-dropzone').fadeOut(500);
        //var properties = this.getDropProperties(e);
        var properties = e;

        var imageUrl = properties.imageUrl;

        if(imageUrl != undefined){
            this.uploadOnLink(imageUrl, resizeImage);
        }else{
            this.runUploadProcess( properties );
        }

    },

    onComponentAdded: function(data){

        this.renderPath();
    }



});

var InfoPointDownloadComponentViewNotEditable = ComponentView.createNotEditableComponentClass(InfoPointDownloadComponentView);