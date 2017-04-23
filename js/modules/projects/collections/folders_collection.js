var FoldersCollection = Backbone.Collection.extend({
	model: FolderItemModel,

	comparator: function(model) {
        return model.get('name').toLowerCase();
    },

    searchStructore: function (value) {

        filtered = this.filter(function (model) {

        	if(model.get('folderID') == 0) return false;

            return model.get("name").toLowerCase().indexOf(value.toLowerCase()) != -1 ? true : false;
        });
        return filtered;
    }

});

var BreacrumbsCollection = Backbone.Collection.extend({
	model: FolderItemModel
});