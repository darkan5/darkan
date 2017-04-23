var NavigationItemViewContextMenuView = ContextMenuView.extend({

    template: _.template($('#navigation-item-context-menu-template').html()),

    onItemClick: function(model){

        var action = model.get('action');

        switch (action){

            case 'close-others':
                this.view.closeOthersProjects();
                break;
        }

        this.close();
    },

    createMenuCollection: function(){

        var contextMenuItemCollection = new ContextMenuItemCollection([

            new ContextMenuItemModel({
                componentName: 'close-others',
                action: 'close-others',
                prettyName: 'Close others',
                icon: 'text',
                className: 'big-btn'
            })
        ]);

        return contextMenuItemCollection;
    }

});
