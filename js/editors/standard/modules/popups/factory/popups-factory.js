function PopupFactory(){

}

PopupFactory.createStandardPopup = function( data, sender ){


    var windowModel = new WindowModel( { type:"standard", modal:true, data:data, sender:sender } );

    var popupView = new StandardPopupView( { windowModel: windowModel } );

    return popupView;
}

PopupFactory.createCreatePdfDialogPopup = function( data, sender ){


    var windowModel = new WindowModel( { type:"standard", modal:true, data:data, sender:sender } );

    var popupView = new CreatePdfDialogPopupView( { windowModel: windowModel } );

    return popupView;
}

PopupFactory.createOverrideExistingPublicationPopup = function( data, sender ){


    var windowModel = new WindowModel( { type:"standard", modal:true, sender:sender } );

    var popupView = new OverrideExistingPublicationPopupView( { windowModel: windowModel, data:data } );

    return popupView;
}

PopupFactory.createErrorPopup = function( data, sender ){


    var windowModel = new WindowModel( { type:"standard", modal:true, sender:sender } );

    var popupView = new ErrorPopupView( { windowModel: windowModel, data:data } );

    return popupView;
}