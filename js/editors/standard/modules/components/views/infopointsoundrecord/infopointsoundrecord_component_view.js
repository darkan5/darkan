var InfoPointSoundRecordComponentView = ImageComponentView.extend({

	className : 'component infopointsoundrecord-component',

	template: _.template($('#infopointsoundrecord-component-template').html()),



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

var InfoPointSoundRecordComponentViewNotEditable = ComponentView.createNotEditableComponentClass(InfoPointSoundRecordComponentView);