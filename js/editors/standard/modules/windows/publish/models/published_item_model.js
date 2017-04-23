var PublishedItemModel = Backbone.Model.extend({
	defaults:{

	},

	renderHide: function() {
		this.trigger('render-hide');
	},

	renderShow: function() {
		this.trigger('render-show');
	}
});

var PublishedItemsCollection = Backbone.Collection.extend({
	model: PublishedItemModel
});