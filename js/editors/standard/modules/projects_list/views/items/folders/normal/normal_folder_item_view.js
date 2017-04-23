var NormalFolderItemView = FolderItemView.extend({

	className: 'projectlist-item folder-item normal-folder-item',

    template: _.template($('#projectslist-normal-folder-item-template').html()),

    events: function(){
        return _.extend({},FolderItemView.prototype.events,{
            
        });
    },

    editFolderName: function(e){

    	
    },

    afterRender: function(){

        
    },


});