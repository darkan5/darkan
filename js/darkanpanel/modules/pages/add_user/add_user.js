var AddUserView = Backbone.View.extend({

	template: _.template($('#adduser-template').html()),

	initialize: function() {

	},

	render: function() {
		this.$el.html(this.template());
		return this;
	}

});