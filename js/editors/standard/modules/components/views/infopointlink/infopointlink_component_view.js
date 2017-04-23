var InfoPointLinkComponentView = ImageComponentView.extend({

	className : 'component infopointlink-component',

	template: _.template($('#infopointlink-component-template').html()),

//    addComponentListeners :function(){
//        this.createMiniature();
//    },

//    makeResizable: function() {
//        return false;
//    }


    setLink: function(imageUrl) {

        this.model.set('link', imageUrl);
    },

    onComponentAdded: function(data){

        this.renderPath();
    }



});

var InfoPointLinkComponentViewNotEditable = ComponentView.createNotEditableComponentClass(InfoPointLinkComponentView);