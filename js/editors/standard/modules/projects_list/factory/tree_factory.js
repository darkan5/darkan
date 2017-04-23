function TreeFactory(){

}

TreeFactory.createTreeByType = function( type, model ){


	switch(type){
		case 'folder':
			return TreeFactory.createNormalTreeView(model);
			break;


		default:
			console.log("No component: " + type);
		  break;			
	}
}

TreeFactory.updateOptionsModel = function( model, options ){

    for(var item in options){

        model.set(item, options[item], {silent:true});
    }
}

TreeFactory.createTreeModelByType = function( type, options ){

    var opts = options || {};

    switch(type){
        case 'folder':
            var model = new FolderListItemModel();
            this.updateOptionsModel(model, opts);
            return model;
        break;


        default:
            console.log("No type: " + type);
            break;
    }

}

TreeFactory.createNormalTreeView = function( model ){
	
	model = model ||  new FolderListItemModel();

	var treeView = new NormalTreeItemView( { model: model } );

	return treeView;
}