function BreadcrumbsFactory(){

}

BreadcrumbsFactory.createBreadcrumbByType = function( type, model ){


	switch(type){
        case 'folder':
			return BreadcrumbsFactory.createNormalBreadcrumbView(model);
			break;

        case 'search-folder':
            return BreadcrumbsFactory.createSearchBreadcrumbView(model);
            break;    

        case 'stFolder':
            return BreadcrumbsFactory.createSharedTemplateBreadcrumbView(model);
            break;


		default:
			console.log("No component: " + type);
		  break;			
	}
}

BreadcrumbsFactory.updateOptionsModel = function( model, options ){

    for(var item in options){

        model.set(item, options[item], {silent:true});
    }
}

BreadcrumbsFactory.createBreadcrumbModelByType = function( type, options ){

    var opts = options || {};

    switch(type){
        case 'folder':
        case 'stFolder':
            var model = new FolderListItemModel();
            this.updateOptionsModel(model, opts);
            return model;
        break;


        default:
            console.log("No type: " + type);
            break;
    }

}

BreadcrumbsFactory.createNormalBreadcrumbView = function( model ){
	
	model = model ||  new FolderListItemModel();

	var breadcrumbView = new NormalBreadcrumbItemView( { model: model } );

	return breadcrumbView;
}

BreadcrumbsFactory.createSharedTemplateBreadcrumbView = function( model ){
    
    model = model ||  new FolderListItemModel();

    var breadcrumbView = new SharedTemplateBreadcrumbItemView( { model: model } );

    return breadcrumbView;
}

BreadcrumbsFactory.createSearchBreadcrumbView = function( model ){
    
    model = model ||  new FolderListItemModel();

    var breadcrumbView = new SearchBreadcrumbItemView( { model: model } );

    return breadcrumbView;
}

