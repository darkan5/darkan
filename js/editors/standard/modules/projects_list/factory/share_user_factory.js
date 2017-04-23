function ShareUserFactory(){

}

ShareUserFactory.createShareUser = function( user ){

    if(_.isUndefined(user.user_id)){

        var model = new ShareUserItemModel(user);

         _log('createShareUser', model);

        return ShareUserFactory.createNotExistShareUserView(model);



    }else{

        var model = new ShareUserItemModel(user);

        return ShareUserFactory.createNormalShareUserView(model);
    }
}

ShareUserFactory.updateOptionsModel = function( model, options ){

    for(var item in options){

        model.set(item, options[item], {silent:true});
    }
}

ShareUserFactory.createShareUserModelByType = function( type, options ){

    var opts = options || {};

    switch(type){
        case 'userProjects':
            var model = new ShareUserItemModel();
            this.updateOptionsModel(model, opts);
            return model;
        break;


        default:
            var model = new ShareUserItemModel();
            this.updateOptionsModel(model, opts);
            return model;
            // console.log("No type: " + type);
            break;
    }

}

ShareUserFactory.createNormalShareUserView = function( model ){
	
	model = model ||  new ShareUserItemModel( );

	var shareUserView = new NormalShareUserItemView( { model: model } );

	return shareUserView;
}

ShareUserFactory.createNotExistShareUserView = function( model ){


    
    model = model ||  new ShareUserItemModel( );

    var shareUserView = new NotExistShareUserItemView( { model: model } );

    return shareUserView;
}