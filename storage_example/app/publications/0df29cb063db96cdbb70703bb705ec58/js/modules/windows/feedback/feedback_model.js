var FeedbackModel = Backbone.Model.extend({
	defaults:{
		type:"",
		draggable : false,
		modal: false,
		left: 0,
		top: 0
	}
});