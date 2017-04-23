var SharedTemplateFolderItemView = FolderItemView.extend({

	className: 'projectlist-item folder-item shared-template-folder-item',

    template: _.template($('#projectslist-shared-template-folder-item-template').html()),

    events: function(){
        return _.extend({},FolderItemView.prototype.events,{
            
        });
    },

    editFolderName: function(e){

    	
    },

    afterRender: function(){

        
    },


});