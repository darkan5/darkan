var EditorContextMenuView = ContextMenuView.extend({

    template: _.template($('#context-menu-template').html()),


    onItemClick: function(model){

        var action = model.get('action');

        switch (action){
            case 'unbind-editor':
                this.view.unbindEditor();
                break;
        }

        this.close();
    },

    createMenuCollection: function(){

        var contextMenuItemCollection = new ContextMenuItemCollection([
            new ContextMenuItemModel({
                componentName: 'unbind-editor',
                action: 'unbind-editor',
                prettyName: _lang('CONTEXT_MENU_UNBIND'),
                prettyName: 'Odepnij',
                icon: 'text',
                className: 'big-btn'
            }),

        ]);

        return contextMenuItemCollection;
    }

});
