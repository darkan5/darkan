var WindowModel = Backbone.Model.extend({
	defaults:{
		type:"",
		draggable : true,
		modal: true,
		left: 0,
		top: 0,
		title: ''
	}
});