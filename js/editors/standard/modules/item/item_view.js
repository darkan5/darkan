var ItemView = Backbone.View.extend({


    onMouseDown :function(e){

        if( this.checkCondition() ){ return; }

        ContextMenuContainer.closeMenu();

        switch(e.button) {

            case 0:
                this.mouseDown(e);
                break;

            case 1:
                this.scroll(e);
                break;

            case 2:
                e.stopPropagation();
                this.mouseDown(e);
                this.showContextMenu(e);
                break;
        }
    },

    checkCondition: function(e) {
         return this.model.get('locked');
    },

    mouseDown: function(e) {

    },

    scroll: function(e) {
        
    },

    showContextMenu: function(e) {

        var contextMenuView = new ContextMenuView({ model: this.getModel(), view: this });

        ContextMenuContainer.addMenu(contextMenuView, e);
    },

    getModel: function() {
        return this.model;
    }


});
