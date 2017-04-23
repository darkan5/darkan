var ComponentContextMenuViewNotEditable = ContextMenuView.extend({

    template: _.template($('#component-context-menu-template').html()),

    onItemClick: function(model){

        _log('model', model);

        var action = model.get('action');

        switch (action){
            case 'copy':
                //StageView.instance.copyComponentsFromOtherProject(this.model);

                this.view.copyComponentsFromOtherProject();

                break;

            case 'copy-trigger':
                StageView.instance.copyTriggerFromOtherProject(this.model);
                break;

            case 'copy-position':
                StageView.instance.copyPositionFromOtherProject(this.model);
                break;

            case 'copy-dimension':
                StageView.instance.copyDimensionFromOtherProject(this.model);
                break;

            case 'copy-style':
                StageView.instance.copyStyleFromOtherProject(this.model);
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
            new LeftMenuItemModel({
                componentName: 'separator',
                className: 'separator'
            }),

            // TRIGGER
            new ContextMenuItemModel({
               componentName: 'extend',
               prettyName: _lang('TRIGGER'),
               icon: 'text',
               className: 'big-btn extend',
               subitems: new ContextMenuItemCollection([
                    new ContextMenuItemModel({
                        componentName: 'copy-trigger',
                        action: 'copy-trigger',
                        prettyName: _lang('CONTEXT_MENU_COPY_COMPONENT_ACTIONS'),
                        icon: 'text',
                        className: 'big-btn'
                    }),
                ]),
            }),

            // POSITION
           new ContextMenuItemModel({
               componentName: 'extend',
               prettyName: _lang('POSITION'),
               icon: 'text',
               className: 'big-btn extend',
               subitems: new ContextMenuItemCollection([
                    new ContextMenuItemModel({
                        componentName: 'copy-position',
                        action: 'copy-position',
                        prettyName: _lang('CONTEXT_MENU_COPY_POSITION'),
                        icon: 'text',
                        className: 'big-btn'
                    }),
                ]),
            }),

            // new LeftMenuItemModel({
            //     componentName: 'separator',
            //     className: 'separator'
            // }),

            // DIMENTIONS
           new ContextMenuItemModel({
               componentName: 'extend',
               prettyName: _lang('AUTH_PROJECT_DIMENTIONS'),
               icon: 'text',
               className: 'big-btn extend',
               subitems: new ContextMenuItemCollection([
                    new ContextMenuItemModel({
                        componentName: 'copy-dimension',
                        action: 'copy-dimension',
                        prettyName: _lang('CONTEXT_MENU_COPY_DIMENSION'),
                        icon: 'text',
                        className: 'big-btn'
                    }),
                ]),
            }),

            // new LeftMenuItemModel({
            //     componentName: 'separator',
            //     className: 'separator'
            // }),

            // STYLES
            new ContextMenuItemModel({
               componentName: 'extend',
               prettyName: _lang('MENU_TOPSTYLES'),
               icon: 'text',
               className: 'big-btn extend',
               subitems: new ContextMenuItemCollection([
                    new ContextMenuItemModel({
                        componentName: 'copy-style',
                        action: 'copy-style',
                        prettyName: _lang('CONTEXT_MENU_COPY_STYLE'),
                        icon: 'text',
                        className: 'big-btn'
                    }),
                ]),
            }),

        ]);


        return contextMenuItemCollection;
    }

});
