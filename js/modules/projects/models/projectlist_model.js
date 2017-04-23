var ProjectListModel = Backbone.Model.extend({

	defaults:function(){
        return {
            folders: new FoldersCollection(),
			objs: new ProjectsCollection(),
			lastFolderID: 0,
			lastVisitedFolderID: -1,
			organizeBy: "alphabetical"
        }
	},

	

});