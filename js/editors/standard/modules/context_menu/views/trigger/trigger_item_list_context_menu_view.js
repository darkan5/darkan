var TriggerItemListContextMenuView = ContextMenuView.extend({

    template: _.template($('#context-menu-template').html()),


    onItemClick: function(model){

        var action = model.get('action');

        switch (action){
            case 'copy-this-action-to-clipboard':
                StageView.instance.copyThisActionToClipboard(this.model.toJSON());
                break;

            case 'to-paste-actions-from-the-clipboard':
                StageView.instance.toPasteActionsFromTheClipboard();
                break;

            case 'clean-actions-clipboard':
                StageView.instance.cleanActionsClipboard();
                break;

            case 'paste-one-trigger':

                var componentName = model.get('componentName');

                var trigger = StageView.instance.clipboardActions[componentName];

                if(trigger){
                    StageView.instance.toPasteActionsFromTheClipboard([ trigger ]);  
                }
                
                break;

            case 'paste-trigger':
                StageView.instance.pasteTrigger();
                break;

        }

        this.close();
    },

    getPasteActionsTriggerName: function(trigger){

        var s = '';

        s += _lang('TRIGGER_LIST_' + trigger.whendoit) + ': ';

        var subtriggers = trigger.subtriggers;

        for (var j = 0; j < subtriggers.length; j++) {

            var whattodo = subtriggers[j].whattodo;

            s +=  _lang('TRIGGER_LIST_' + whattodo);

            if(j < subtriggers.length - 1){
                s += ', '
            }
        };

        return s;
    },

    createPasteActionsSubitems: function(){

        var _that = this;

        var subitems = new ContextMenuItemCollection();

        var clipboardActions = StageView.instance.clipboardActions;

        for (var i = 0; i < clipboardActions.length; i++) {
            var trigger = clipboardActions[i];

            

           var contextMenuItemModel = new ContextMenuItemModel({
                componentName: i,
                action: 'paste-one-trigger',
                prettyName: _that.getPasteActionsTriggerName(trigger),
                icon: 'text',
                className: 'big-btn'
            });

            subitems.add(contextMenuItemModel);
            
        };

        return subitems;
    },

    createMenuCollection: function(){

        var _that = this;

        var contextMenuItemCollection = new ContextMenuItemCollection([
            new ContextMenuItemModel({
                componentName: 'copy-this-action-to-clipboard',
                action: 'copy-this-action-to-clipboard',
                prettyName: _lang('CONTEXT_MENU_COPY_THIS_ACTION_TO_CLIPBOARD'),
                icon: 'text',
                className: 'big-btn'
            }),
            new ContextMenuItemModel({
                componentName: 'extend',
                action: 'to-paste-actions-from-the-clipboard',
                prettyName: _lang('CONTEXT_MENU_TO_PASTE_ACTIONS_FROM_THE_CLIPBOARD'),
                icon: 'text',
                className: 'big-btn extend',
                disabled: StageView.instance.clipboardActions.length == 0 ? true : false,
                subitems: _that.createPasteActionsSubitems()
            }),
            new ContextMenuItemModel({
                componentName: 'extend',
                action: 'paste-trigger',
                prettyName: _lang('CONTEXT_MENU_PASTE_COMPONENT_ACTIONS'),
                icon: 'text',
                className: 'big-btn extend',
                disabled: StageView.instance.clipboardActions.length == 0 ? true : false,
                subitems: _that.createPasteActionsSubitems()
            }),
            new ContextMenuItemModel({
                componentName: 'clean-actions-clipboard',
                action: 'clean-actions-clipboard',
                prettyName: _lang('CONTEXT_MENU_CLEAN_ACTIONS_CLIPBOARD'),
                icon: 'text',
                className: 'big-btn',
                disabled: StageView.instance.clipboardActions.length == 0 ? true : false
            }),

        ]);

        return contextMenuItemCollection;
    }

});
