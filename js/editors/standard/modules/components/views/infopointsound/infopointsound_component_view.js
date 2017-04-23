var InfoPointSoundComponentView = ImageComponentView.extend({

	className : 'component infopointsound-component',

	template: _.template($('#infopointsound-component-template').html()),

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



    uploadOnSoundFileDrop: function(e, resizeImage) {

        if(!StageView.instance.canEdit) { return; }

        this.model.setComponentAsSound();

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
    },

    showContextMenu: function(e) {

        if(StageView.instance.selectedComponentsCollection.length > 1){
            var contextMenuView = new MultiComponentContextMenuView({ model: this.getModel(), view: this });
            ContextMenuContainer.addMenu(contextMenuView, e);
        }else{
            var contextMenuView = new AudioComponentContextMenuView({ model: this.getModel(), view: this });
            ContextMenuContainer.addMenu(contextMenuView, e);
        }
    },


});

var InfoPointSoundComponentViewNotEditable = ComponentView.createNotEditableComponentClass(InfoPointSoundComponentView);