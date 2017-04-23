var MultiComponentContextMenuView = ComponentContextMenuView.extend({

    template: _.template($('#multi-component-context-menu-template').html()),

    checkIfModelIsHidden: function(){

        var allHidden = true;

        _log('checkIfModelIsHidden this.model', this.model);

        StageView.instance.selectedComponentsCollection.each(function(cModel){
            if(!cModel.get('hidden')){
                allHidden = false;
            }
        });

        return allHidden;
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
                componentName: 'cut',
                action: 'cut',
                prettyName: _lang('CONTEXT_MENU_CUT'),
                icon: 'text',
                className: 'big-btn'
            }),
            new ContextMenuItemModel({
                componentName: 'hide-or-show',
                action: this.checkIfModelIsHidden() ? 'show' : 'hide',
                prettyName: this.checkIfModelIsHidden() ? _lang('CONTEXT_MENU_SHOW') : _lang('CONTEXT_MENU_HIDE'),
                icon: 'text',
                className: 'big-btn'
            }),
            new ContextMenuItemModel({
                componentName: 'remove',
                action: 'remove',
                prettyName: _lang('CONTEXT_MENU_REMOVE'),
                icon: 'text',
                className: 'big-btn'
            }),
            new ContextMenuItemModel({
                componentName: 'border',
                action: 'border',
                prettyName: _lang('CONTEXT_MENU_BORDER'),
                icon: 'text',
                className: 'big-btn'
            }),
            new LeftMenuItemModel({
                componentName: 'separator',
                className: 'separator'
            }),

            new ContextMenuItemModel({
                componentName: 'paste-trigger',
                action: 'paste-trigger',
                prettyName: _lang('CONTEXT_MENU_PASTE_COMPONENT_ACTIONS'),
                icon: 'text',
                className: 'big-btn',
                disabled: StageView.instance.clipboardActions.length == 0 ? true : false
            }),

            new ContextMenuItemModel({
                componentName: 'paste-position',
                action: 'paste-position',
                prettyName: _lang('CONTEXT_MENU_PASTE_POSITION'),
                icon: 'text',
                className: 'big-btn',
                disabled: StageView.instance.copiedComponentPosition.length == 0 ? true : false
            }),


            new ContextMenuItemModel({
                componentName: 'paste-dimension',
                action: 'paste-dimension',
                prettyName: _lang('CONTEXT_MENU_PASTE_DIMENSION'),
                icon: 'text',
                className: 'big-btn',
                disabled: StageView.instance.copiedComponentDimensions.length == 0 ? true : false
            }),


            new ContextMenuItemModel({
                componentName: 'paste-style',
                action: 'paste-style',
                prettyName: _lang('CONTEXT_MENU_PASTE_STYLE'),
                icon: 'text',
                className: 'big-btn'
            }),
            new LeftMenuItemModel({
                componentName: 'separator',
                className: 'separator'
            }),

            // LAYERS
            new ContextMenuItemModel({
                componentName: 'extend',
                prettyName: _lang('TIMELINE_ROW'),
                icon: 'text',
                className: 'big-btn extend',
                subitems: new ContextMenuItemCollection([
                    new ContextMenuItemModel({
                        componentName: 'move-components-to-new-line',
                        action: 'move-components-to-new-line',
                        prettyName: _lang('CONTEX_TMENU_MOVE_COMPONENTS_TO_NEW_LINE'),
                        icon: 'text',
                        className: 'big-btn'
                    }),

                    new ContextMenuItemModel({
                        componentName: 'copy-components-to-new-line',
                        action: 'copy-components-to-new-line',
                        prettyName: _lang('CONTEX_TMENU_COPY_COMPONENTS_TO_NEW_LINE'),
                        icon: 'text',
                        className: 'big-btn'
                    }),
                ])
            })

        ]);

        return contextMenuItemCollection;

    }

});
