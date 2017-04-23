var DrawedInfoPointGalleryComponentView = InfoPointGalleryComponentView.extend({

	className : 'component drawedinfopointgallery-component',

	template: _.template($('#drawedinfopointgallery-component-template').html()),

});

var DrawedInfoPointGalleryComponentViewNotEditable = ComponentView.createNotEditableComponentClass(DrawedInfoPointGalleryComponentView);