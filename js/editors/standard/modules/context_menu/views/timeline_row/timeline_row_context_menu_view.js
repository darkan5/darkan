var TimelineRowContextMenuView = ContextMenuView.extend({

    template: _.template($('#timeline-row-context-menu-template').html()),

    onItemClick: function(model){

        var action = model.get('action');

        switch (action){
            case 'copy':
                StageView.instance.copyComponents();
                break;

            case 'remove':
                StageView.instance.deleteActiveComponent();
                break;

            case 'hide':
                StageView.instance.hideComponents();
                break;

            case 'paste':
                StageView.instance.pasteComponents();
                break;
        }

        this.close();
    },

    createMenuCollection: function(){

        var contextMenuItemCollection = new ContextMenuItemCollection([
            new ContextMenuItemModel({
                componentName: 'copy',
                action: 'copy',
                prettyName: _lang('CONTEXT_MENU_COPY'),
                icon: 'text',
                className: 'big-btn'
            }),
            new ContextMenuItemModel({
                componentName: 'paste',
                action: 'paste',
                prettyName: _lang('CONTEXT_MENU_PASTE'),
                icon: 'text',
                className: 'big-btn',
                disabled: StageView.instance.hash == undefined ? true : false
            }),
            new ContextMenuItemModel({
                componentName: 'remove',
                action: 'remove',
                prettyName: _lang('CONTEXT_MENU_REMOVE'),
                icon: 'text',
                className: 'big-btn'
            }),
            new ContextMenuItemModel({
                componentName: 'hide',
                action: 'hide',
                prettyName: _lang('CONTEXT_MENU_SHOW_HIDE'),
                icon: 'text',
                className: 'big-btn'
            })

        ]);

        return contextMenuItemCollection;
    }

});
