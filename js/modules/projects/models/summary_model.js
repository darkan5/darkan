var SummaryModel = Backbone.Model.extend({

	defaults:function(){
        return {
        	userProjects : '',
            userMaxProjects : '',
	        userPublications : '',
	        maxPublications : '',
	        userUsedSpace : '',
	        maxUsedSpace : ''
        }
	},
});