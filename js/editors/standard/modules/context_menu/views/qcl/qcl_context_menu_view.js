var QclContextMenuView = ContextMenuView.extend({

    template: _.template($('#qcl-context-menu-template').html()),

    onItemClick: function(model){

        var action = model.get('action');

        switch (action){
            case 'edit':
                this.view.showEditWindowForOneObject(this.e);
                break;

            case 'delete':
                this.view.deleteObject(this.e);
                break;
        }

        this.close();
    },

    createMenuCollection: function(){

        var contextMenuItemCollection = new ContextMenuItemCollection([
            new ContextMenuItemModel({
                componentName: 'edit',
                action: 'edit',
                prettyName: _lang('CONTEXT_MENU_EDIT'),
                icon: 'text',
                className: 'big-btn'
            }),
            new ContextMenuItemModel({
                componentName: 'delete',
                action: 'delete',
                prettyName: _lang('CONTEXT_MENU_DELETE'),
                icon: 'text',
                className: 'big-btn'
            })
        ]);

        return contextMenuItemCollection;
    }

});
