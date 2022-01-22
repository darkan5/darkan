var TimelineRowOptionsModel =  Backbone.Model.extend({
	defaults:{
		id: 0,
		visible: true,
		active: false
	}
});


var TimelineRowModel = Backbone.Model.extend({
	defaults: {
		objects: new ComponentsCollection(),
		options: new TimelineRowOptionsModel(),
		type: 'line',
		action: ''
	}
});

var TimelineRowCollection = Backbone.Collection.extend({
	model: TimelineRowModel
});