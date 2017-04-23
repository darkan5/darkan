var LmsView = Backbone.View.extend({

	el: $('#page-wrapper'),

	initialize: function() {
		var _that = this;

		$('#side-menu').metisMenu();

		this.router = new LmsRouter();
		this.router.on('change-content', function(content) {
			_that.$el.html(content);
		});
	},

	render: function() {

	}

});