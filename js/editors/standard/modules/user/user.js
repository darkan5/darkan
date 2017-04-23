function User(){

     this.selectedActionkey = null;

}

User.getModel = function(){

    if(this.userInfoModel == undefined){
        this.userInfoModel = new UserInfoModel();
    }

    return this.userInfoModel;
}

User.setSelectedComponentModel = function( model ){

    this.userInfoModel = model;
}

User.getSelectedComponentModel = function( lines ){

    var activeComponent =  this.userInfoModel.get('activeComponent');

    var actionkey = activeComponent.get('actionkey');

    lines.timeline.collection.each(function(item) {
        var objects = item.get('objects');

        objects.each(function(model){
            //model.set('active', false);
            //model.setActive( false );

            if(activeComponent.get('actionkey') == actionkey){
                activeComponent
            }
        });

    });
}

User.getSelectedActionkey = function(){

    return this.selectedActionkey;
}

User.setSelectedActionkey = function(actionkey){

    this.selectedActionkey = actionkey;
}


