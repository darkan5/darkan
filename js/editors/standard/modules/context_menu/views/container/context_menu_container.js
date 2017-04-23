ContextMenuContainer = function(){
    this.contextMenu = new ContextMenuView({ windowModel:new WindowModel() });
}

ContextMenuContainer.addMenu = function(contextMenu, e){

    ContextMenuContainer.closeMenu();

    $('body').append(contextMenu.render({ model:contextMenu.model.toJSON() }).$el);

    var left = e.pageX;
    var top = e.pageY;

    contextMenu.setWindowPosition({ left: left, top:top });

    this.contextMenu = contextMenu;
}

ContextMenuContainer.closeMenu = function(){

    if(this.contextMenu != undefined){
        this.contextMenu.close();
    }
}

ContextMenuContainer.instance = new ContextMenuContainer();
