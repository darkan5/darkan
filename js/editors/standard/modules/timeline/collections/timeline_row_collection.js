var TimelineRowCollection = Backbone.Collection.extend({
	model: TimelineRowModel,

	getLineById: function(lineId) {
		var foundLine = false;
		this.each(function(lineModel) {
			if (lineModel.get('options').get('id') == lineId) {
				foundLine = lineModel;
			}
		});
		return foundLine;
	}
});
