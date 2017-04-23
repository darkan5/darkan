var NormalFolderItemView = FolderItemView.extend({

	className: 'projectlist-item normal-folder-item',

    template: _.template($('#projectslist-normal-folder-item-template').html()),

    events: function(){
        return _.extend({},FolderItemView.prototype.events,{
            'click .delete-folder-button': 'showDeleteFolderWindow',
        });
    },

    editFolderName: function(e){

    	alert('Not working now');
    },

    showDeleteFolderWindow: function(e){

        e.preventDefault();
        e.stopPropagation();

    	var deleteFolderPopup = PopupFactory.createDeleteFolderPopup({ folderModel:this.model });
    	deleteFolderPopup.setTitle('Delete folder');
    	deleteFolderPopup.on('on-folder-deleted', this.deleteFolder, this);
    	$('body').append(deleteFolderPopup.render().$el);
    },

    deleteFolder: function(foldersStructure){

    	var _that = this;

        this.trigger('delete-folder', foldersStructure);
    },

    afterRender: function(){

        
    },


});