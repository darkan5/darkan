var FolderItemModel = ProjectListItemModel.extend({

	defaults:function(){
        return {
            folder: '',
            folderID: '',
            name: '',
            pType: 'folder',
        }
	},	

});