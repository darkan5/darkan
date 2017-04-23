var PageContextMenuView = ContextMenuView.extend({

    template: _.template($('#page-context-menu-template').html()),

    checkIfModelIsActive: function(){
        return this.model.get('options').get('active');
    },

    onItemClick: function(model){

        var action = model.get('action');

        switch (action){
            case 'new-page':
                ProjectView.instance.createNewPage();
                break;

            case 'duplicate-page':
                ProjectView.instance.duplicatePages();
                break;

            case 'hide-page':
                this.view.changePageShow();
                break;

            case 'change-background-page':
                this.view.uploadOnClick();
                break;

            case 'delete-page':

                var left = parseInt(this.$el.css('left')) + parseInt(this.$el.css('width'));
                var top = parseInt(this.$el.css('top')) + parseInt(this.$el.css('width') );

                ProjectView.instance.showDeletePagesWindow({ pageX:left , pageY:top });
                break;

            case 'copy-trigger':
                this.view.copyTrigger();
                break;

            case 'paste-trigger':

                var triggers = ProjectView.instance.pagesList.copiedPageTrigger;

                this.view.pasteTrigger( triggers );

                
                
                break;
        }

        this.close();
    },

    createMenuCollection: function(){

        var contextMenuItemCollection = new ContextMenuItemCollection([
            new ContextMenuItemModel({
                componentName: 'new-page',
                action: 'new-page',
                prettyName: _lang('CONTEXT_MENU_NEW_PAGE'),
                icon: 'text',
                className: 'big-btn'
            }),
            new ContextMenuItemModel({
                componentName: 'duplicate-page',
                action: 'duplicate-page',
                prettyName: _lang('CONTEXT_MENU_NEW_DUPLICATE_PAGE'),
                icon: 'text',
                className: 'big-btn'
            }),
            new ContextMenuItemModel({
                componentName: 'hide-page',
                action: 'hide-page',
                prettyName: this.checkIfModelIsActive() ? _lang('CONTEXT_MENU_HIDE_PAGE') : _lang('CONTEXT_MENU_SHOW_PAGE'),
                icon: 'text',
                className: 'big-btn'
            }),
            new ContextMenuItemModel({
                componentName: 'change-background-page',
                action: 'change-background-page',
                prettyName: _lang('CONTEXT_MENU_CHANGE_PAGE_BACKGROUND'),
                icon: 'text',
                className: 'big-btn'
            }),
            new ContextMenuItemModel({
                componentName: 'delete-page',
                action: 'delete-page',
                prettyName: _lang('CONTEXT_MENU_PAGE_REMOVE'),
                icon: 'text',
                className: 'big-btn'
            }),

            new LeftMenuItemModel({
                componentName: 'separator',
                className: 'separator'
            }),


            new ContextMenuItemModel({
                componentName: 'extend',
                prettyName: _lang('TRIGGER'),
                icon: 'text',
                className: 'big-btn extend',
                subitems: new ContextMenuItemCollection([
                    new ContextMenuItemModel({
                        componentName: 'copy-trigger',
                        action: 'copy-trigger',
                        prettyName: _lang('CONTEXT_MENU_COPY_PAGE_ACTIONS'),
                        icon: 'text',
                        className: 'big-btn'
                    }),

                    new ContextMenuItemModel({
                        componentName: 'paste-trigger',
                        action: 'paste-trigger',
                        prettyName: _lang('CONTEXT_MENU_PASTE_PAGE_ACTIONS'),
                        icon: 'text',
                        className: 'big-btn',
                        //disabled: RightMenuView.instance.pageListView.copiedPageTrigger.length == 0 ? true : false
                    })
                ])
            })



        ]);

        return contextMenuItemCollection;
    }

});
