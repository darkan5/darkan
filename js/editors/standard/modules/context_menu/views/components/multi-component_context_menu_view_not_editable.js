var MultiComponentContextMenuViewNotEditable = ComponentContextMenuViewNotEditable.extend({

    template: _.template($('#multi-component-context-menu-template').html()),

    createMenuCollection: function(){

        var contextMenuItemCollection = new ContextMenuItemCollection([
            new ContextMenuItemModel({
                componentName: 'copy',
                action: 'copy',
                prettyName: _lang('CONTEXT_MENU_COPY'),
                icon: 'text',
                className: 'big-btn'
            }),

        ]);

        return contextMenuItemCollection;

    }

});
