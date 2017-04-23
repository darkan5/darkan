var TimelineEmptyRowContextMenuView = ContextMenuView.extend({

    template: _.template($('#timeline-empty-row-context-menu-template').html()),

    onItemClick: function(model){

        var action = model.get('action');

        switch (action){

            case 'paste':
                StageView.instance.pasteComponents();
                break;
        }

        this.close();
    },

    createMenuCollection: function(){

        var contextMenuItemCollection = new ContextMenuItemCollection([
            new ContextMenuItemModel({
                componentName: 'paste',
                action: 'paste',
                prettyName: _lang('CONTEXT_MENU_PASTE'),
                icon: 'text',
                className: 'big-btn',
                disabled: StageView.instance.hash == undefined ? true : false
            })
        ]);

        return contextMenuItemCollection;
    }

});
