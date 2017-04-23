var ProjectWatcherView = Backbone.View.extend({

    template: _.template($('#project-watcher-template').html()),


    events:{
        // 'click .history-back': 'back',
        // 'click .history-prev': 'prev'
    },

    initialize :function(){

        var _that = this;

        this.collection = new Backbone.Collection();

        DataAccess.watchProject(
            {},
            function(data) {

                _log('On project chenged result:', data, _log.error);

                _that.onProjectChanged(data);
            },
            function(data) {
                _log('On project chenged fault:', data, _log.error);
            }
        );
    },

    onProjectChanged :function( data ){

        var _that = this;

        var stageView = StageView.instance;
        var rightMenuView = RightMenuView.instance;
        var projectModel = ProjectModel.instance;


        var event =  data.event;

        switch (event){

            case 'updateComponent':

                var components =  data.components;
                var pageId =  parseInt(data.pageId);

                if(!_.isNumber(pageId)){
                    return false;
                }

                if(!_.isArray(components)){
                    return false;
                }

                if(this.pageIsTheSame(pageId)){

                    stageView.updateComponentsResultComing(data);

                }else{

                    var pageModel = projectModel.getPageModelByPageId(pageId);

                    if(pageModel){

                        pageModel.updateComponentsCollection(data);
                    }
                }

                break;

            case 'addComponents':

                var components =  data.components;
                var pageId =  parseInt(data.pageId);

                if(!_.isNumber(pageId)){
                    return false;
                }

                if(!_.isArray(components)){
                    return false;
                }

                if(this.pageIsTheSame(pageId)){

                    stageView.addComponentsToStage(data);

                }else{

                    var pageModel = projectModel.getPageModelByPageId(pageId);

                    if(pageModel){

                        pageModel.addComponents(data);
                    }
                }

                

                break;

            case 'deleteComponents':

                var components =  data.components;
                var pageId =  parseInt(data.pageId);

                if(!_.isNumber(pageId)){
                    return false;
                }

                if(!_.isArray(components)){
                    return false;
                }

                if(this.pageIsTheSame(pageId)){

                    stageView.onDeleteComponentsResultComing(data);

                }else{

                    var pageModel = projectModel.getPageModelByPageId(pageId);

                    if(pageModel){

                        pageModel.deleteComponents(data);
                    }
                }


                break;

            case 'pasteComponents':

                var components =  data.components;
                var pageId =  parseInt(data.pageId);

                if(!_.isNumber(pageId)){
                    return false;
                }

                if(!_.isArray(components)){
                    return false;
                }

                if(this.pageIsTheSame(pageId)){

                    stageView.onPasteComponentsResult(data);

                }else{

                    var pageModel = projectModel.getPageModelByPageId(pageId);

                    if(pageModel){

                        pageModel.pasteComponents(data);
                    }
                }

                break;

            case 'cutComponents':

                var components =  data.components;
                var pageId =  parseInt(data.pageId);

                if(!_.isNumber(pageId)){
                    return false;
                }

                if(!_.isArray(components)){
                    return false;
                }

                if(this.pageIsTheSame(pageId)){

                    stageView.onCutComponentsResultComing(data);

                }else{

                    var pageModel = projectModel.getPageModelByPageId(pageId);

                    if(pageModel){

                        pageModel.cutComponents(data);
                    }
                }
                

                break;

            case 'moveComponentsToLayer':

                var components =  data.components;
                var pageId =  parseInt(data.pageId);

                if(!_.isNumber(pageId)){
                    return false;
                }

                if(!_.isArray(components)){
                    return false;
                }


                if(this.pageIsTheSame(pageId)){

                    stageView.onMoveComponentsResult(data);
                    stageView.renderZIndex();

                }else{

                    var pageModel = projectModel.getPageModelByPageId(pageId);

                    if(pageModel){

                        pageModel.moveComponentsToLayer(data);
                    }
                }
                

                break;   

            case 'sortRows':

                var pageId =  parseInt(data.pageId);

                if(!_.isNumber(pageId)){
                    return false;
                }

                if(this.pageIsTheSame(pageId)){

                    stageView.onSortRowsResult(data);

                }else{

                    var pageModel = projectModel.getPageModelByPageId(pageId);

                    if(pageModel){

                        pageModel.sortRows(data);
                    }
                }

                

                break;   

            case 'updateRowOptions':

                var pageId =  parseInt(data.pageId);

                if(!_.isNumber(pageId)){
                    return false;
                }

                if(this.pageIsTheSame(pageId)){

                    stageView.updateRowOptionsResult(data);

                }else{

                    var pageModel = projectModel.getPageModelByPageId(pageId);

                    if(pageModel){

                        pageModel.updateRowOptions(data);
                    }
                }               

                break;   

            case 'addNewPage':

                ProjectView.instance.pagesList.onCreateBlankPageComing(data);
                ProjectView.instance.pagesList.render();
                ProjectView.instance.pagesList.afterRender();

                break;     

            case 'updatePageSort':

                ProjectView.instance.pagesList.onUpdatePageSortResult(data);

                break;  

            case 'updatePageOptions':

                var pageId =  parseInt(data.pageId);
                var pageOptions =  data.pageOptions;

                if(!_.isNumber(pageId)){
                    return false;
                }

                if(this.pageIsTheSame(pageId)){

                    var pageModel = projectModel.getPageModelByPageId(pageId);

                    if(pageModel){

                        var changed = pageModel.updatePageOptions(data);

                        // for (var i = 0; i < changed.length; i++) {
                        //     var item = changed[i];

                        //     switch(item){
                        //         case 'bgcolor':

                        //             stageView.renderBackgroundColor();

                        //             break;

                        //         case 'bgcolor':

                        //             stageView.renderBackgroundColor();

                        //             break;
                        //     }
                        // };
                    }

                }else{

                    var pageModel = projectModel.getPageModelByPageId(pageId);
                    var changed = pageModel.updatePageOptions(data);   
                }


                break;


            case 'deletePages':

                ProjectView.instance.pagesList.onPagesDeletedResult(data);

                break;  

            case 'duplicatePages':

                ProjectView.instance.pagesList.onPagesDuplicatedResultComing(data);

                break; 

            case 'updatePagesOptions':

                projectModel.updatePagesOptions(data);

                break;    

                
                
        }


    },

    pageIsTheSame :function( pageId ){

        return (pageId == StageView.instance.model.get('options').get('pageid') && StageView.instance.canEdit);
    },

    remember :function( data ){

        var _that = this;
    },

    render :function(){

        var template = this.template();
        this.$el.append(template);

        var projectWatcherModel = new ProjectWatcherModel();

        this.collection.add(projectWatcherModel);

        this.collection.each(this.addItem, this);

        return this;
    },

    addItem :function(itemModel){

        var itemView = new ProjectWatcherItemView({ model: itemModel });
        this.$el.find('.project-watcher-list').append(itemView.render().$el);
    },

    clear: function(){

        this.collection.reset();
        this.render();

    }
});
