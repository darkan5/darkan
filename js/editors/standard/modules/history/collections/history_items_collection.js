var HistoryItemsCollection = Backbone.Collection.extend({
	model: HistoryItemModel,

	// comparator: function(model) {
 //        return model.get('name').toLowerCase();
 //    },

    searchStructore: function (value) {

    	var _that = this;

        filtered = this.filter(function (model) {

            return (model.get("login") == value) ? true : false;
        });
        return new HistoryItemsCollection(filtered);
    }

});