var TimelineItemCollection = Backbone.Collection.extend({
	model: ComponentModel,

	initialize : function(){
		this.bind("add", this.onAddNewComponent);
	},

	onAddNewComponent : function(addedModel){
//	    WebService.updatePage(
//	    	stageModel.toJSON(),
//	        function(data){
//	            console.log(  "Update page successed: ", data )   ;
//	        },
//	        function(data){
//	            console.log(  "ERROR on updating page: ", data )   ;
//	        }
//	    );
	},


});