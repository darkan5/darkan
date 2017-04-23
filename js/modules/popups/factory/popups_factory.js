function PopupFactory(){

}

PopupFactory.createDeleteFolderPopup = function( data, sender ){


    var windowModel = new PopupModel( { modal:true } );

    var popupView = new DeleteFolderPopupView( { windowModel: windowModel, data:data, sender:sender } );

    return popupView;
}

PopupFactory.createDeleteProjectPopup = function( data, sender ){


    var windowModel = new PopupModel( { modal:true} );

    var popupView = new DeleteProjectPopupView( { windowModel: windowModel, data:data, sender:sender } );

    return popupView;
}



PopupFactory.createErrorPopup = function( data, sender ){


    var windowModel = new PopupModel( {  modal:true } );

    var popupView = new ErrorPopupView( { windowModel: windowModel, data:data, sender:sender} );

    return popupView;
}