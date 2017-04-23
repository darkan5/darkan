var EditorNavigationItemModel = Backbone.Model.extend({
	defaults:{
        name: '',
        type: '',
        isBinding: true,
	},

	isDisabled: false,

    initialize: function() {

    }
});