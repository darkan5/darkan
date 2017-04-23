var WindowModel = Backbone.Model.extend({
	defaults:{
		type:"",
		draggable : true,
		left: 0,
		top: 0,
        title: "",
        content: "",
        zIndex: 5000
	}
});