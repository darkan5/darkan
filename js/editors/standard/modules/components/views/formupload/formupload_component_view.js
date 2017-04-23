var FormUploadComponentView = ImageComponentView.extend({

	className : 'component formupload-component',

	template: _.template($('#formupload-component-template').html()),

	onComponentAdded: function(data){

        this.renderPath();
    }


});

var FormUploadComponentViewNotEditable = ComponentView.createNotEditableComponentClass(FormUploadComponentView);