var StageContextMenuView = ContextMenuView.extend({

    template: _.template($('#stage-context-menu-template').html()),

    onItemClick: function(model){

        var action = model.get('action');

        switch (action){
            case 'paste-in-place':
                StageView.instance.pasteComponents();
                break;

            case 'change-background':
                StageView.instance.model.view.openImageWindow();
                break;
        }

        this.close();
    },

    createMenuCollection: function(){

        var contextMenuItemCollection = new ContextMenuItemCollection([
            new ContextMenuItemModel({
                componentName: 'paste-in-place',
                action: 'paste-in-place',
                prettyName: _lang('CONTEXT_MENU_PASTE_IN_PLACE'),
                icon: 'text',
                className: 'big-btn',
                disabled: StageView.instance.hash == undefined ? true : false
            }),
            new ContextMenuItemModel({
                componentName: 'change-background',
                action: 'change-background',
                prettyName: _lang('CONTEXT_MENU_CHANGE_PAGE_BACKGROUND'),
                icon: 'text',
                className: 'big-btn'
            })
        ]);

        return contextMenuItemCollection;
    }

});
