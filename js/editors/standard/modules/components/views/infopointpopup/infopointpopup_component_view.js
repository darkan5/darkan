var InfoPointPopupComponentView = ImageComponentView.extend({

	className : 'component infopointpopup-component',

	template: _.template($('#infopointpopup-component-template').html()),

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

var InfoPointPopupComponentViewNotEditable = ComponentView.createNotEditableComponentClass(InfoPointPopupComponentView);