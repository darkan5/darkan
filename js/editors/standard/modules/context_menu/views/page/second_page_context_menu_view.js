var SecondPageContextMenuView = ContextMenuView.extend({

    template: _.template($('#second_page-context-menu-template').html()),

    onItemClick: function(model){

        var action = model.get('action');

        switch (action){
            case 'copy-page':

                ProjectView.selected.copyPages();

                break;
        }

        this.close();
    },

    createMenuCollection: function(){

        var contextMenuItemCollection = new ContextMenuItemCollection([
            new ContextMenuItemModel({
                componentName: 'copy-page',
                action: 'copy-page',
                prettyName: _lang('CONTEXT_MENU_COPY_PAGE'),
                icon: 'text',
                className: 'big-btn'
            })
        ]);

        return contextMenuItemCollection;
    }

});
