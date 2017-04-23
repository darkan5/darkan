function FoldersFactory(){

}

FoldersFactory.createFolderByType = function( type, model ){


	switch(type){
		case 'folder':
			return FoldersFactory.createNormalFolderView(model);
			break;

        case 'stFolder':
            return FoldersFactory.createSharedTemplateFolderView(model);
            break;


		default:
			console.log("No component: " + type);
		  break;			
	}
}

FoldersFactory.updateOptionsModel = function( model, options ){

    for(var item in options){

        model.set(item, options[item], {silent:true});
    }
}

FoldersFactory.createFolderModelByType = function( type, options ){

    var opts = options || {};

    switch(type){
        case 'folder':
            var model = new ProjectListItemModel();
            this.updateOptionsModel(model, opts);
            return model;
        break;

        case 'stFolder':
            var model = new ProjectListItemModel();
            this.updateOptionsModel(model, opts);
            return model;
        break;


        default:
            console.log("No type: " + type);
            break;
    }

}

FoldersFactory.createNormalFolderView = function( model ){
	
	model = model ||  new ProjectListItemModel( );

	var folderView = new NormalFolderItemView( { model: model } );

	return folderView;
}

FoldersFactory.createSharedTemplateFolderView = function( model ){
    
    model = model ||  new ProjectListItemModel( );

    var folderView = new SharedTemplateFolderItemView( { model: model } );

    return folderView;
}