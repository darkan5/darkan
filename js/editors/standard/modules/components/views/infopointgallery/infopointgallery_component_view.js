var InfoPointGalleryComponentView = ImageComponentView.extend({

	className : 'component infopointgallery-component',

	template: _.template($('#infopointgallery-component-template').html()),


//    addComponentListeners :function(){
//
//    },

//    makeResizable: function() {
//        return false;
//    }

	onComponentAdded: function(data){

        this.renderPath();
    }


});

var InfoPointGalleryComponentViewNotEditable = ComponentView.createNotEditableComponentClass(InfoPointGalleryComponentView);