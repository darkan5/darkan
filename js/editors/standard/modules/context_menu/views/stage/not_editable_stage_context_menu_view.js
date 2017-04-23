var NotEditableStageContextMenuView = ContextMenuView.extend({

    template: _.template($('#stage-context-menu-template').html()),

    onItemClick: function(model){

        var action = model.get('action');

        switch (action){
            case 'copy-page':

                var pageIds = [this.view.model.get('options').get('pageid')];

                if(pageIds.length == 0){
                    return;
                }

                var userId = this.view.model.userid;
                var projectId = this.view.model.projectId;

                ProjectView.instance.copyPagesFromOtherProject(pageIds, userId, projectId);
                
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
