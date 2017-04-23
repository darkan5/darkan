var ProjectsItemsCollection = Backbone.Collection.extend({
	model: ProjectsListItemModel,

	comparator: function(model) {
        return model.get('name').toLowerCase();
    },

    searchStructore: function (value) {

        var searchValue = value.toLowerCase();

        filtered = this.filter(function (model) {

            var name = model.get("name").toLowerCase();
            var fromuser = model.get("fromuser");
            

            if(name.indexOf(searchValue) != -1 || (fromuser && fromuser.toLowerCase().indexOf(searchValue) != -1) ){
                return true;
            }else{
                return false;
            }
        });
        return filtered;
    }
});