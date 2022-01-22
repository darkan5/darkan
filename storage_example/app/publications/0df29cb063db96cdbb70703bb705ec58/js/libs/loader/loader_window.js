var LoaderWindow = Backbone.View.extend({
	el: $('<div></div>', {
		class: 'easy-loader animated'
	}),

	isShown: false,
	animationOut: 'fadeOut',

	showTimeout: undefined,
	hideTimeout: undefined,

	timeoutTime: 50,

	initialize: function() {
		$('.darkan-content').append(this.$el);
		this.$el.css({
			display: 'none'
		});
	},

	show: function() {
		var _that = this;

		_that.$el
			.removeClass(_that.animationOut)
			.show();

	},

	hide: function() {
		var _that = this;


		clearTimeout(this.hideTimeout);
		this.hideTimeout = setTimeout(function() {

			_that.$el
				.addClass(_that.animationOut);

			setTimeout(function() {
				_that.$el.hide();
			}, 500);
			
		}, 500);
			
	}

});

var loaderDarkan = new LoaderWindow();