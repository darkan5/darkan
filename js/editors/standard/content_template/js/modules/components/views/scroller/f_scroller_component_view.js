var ScrollerComponentView = ComponentView.extend({

	className : 'component scroller-component',

	template: _.template($('#scroller-component-template').html()),

	showComponent: function() {
		this.$el.hide();

		if (this.model.get('hidden')) { return false;}

		var scrollTopValue = this.model.get('y');
		var scrollTime = this.model.get('scrollTime');

		this.$el.trigger('scroll-top', {scrollTopValue: scrollTopValue, scrollTime: scrollTime});
	},

	alternativeShow: function() {
		this.$el.hide();

		var scrollTopValue = this.model.get('y');
		var scrollTime = this.model.get('scrollTime');

		this.$el.trigger('scroll-top', {scrollTopValue: scrollTopValue, scrollTime: scrollTime});
		return true;
	}
});