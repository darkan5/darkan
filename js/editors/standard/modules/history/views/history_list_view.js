var HistoryListView = Backbone.View.extend({

    index: -1,

    template: _.template($('#history-list-template').html()),

    visible : false,
    isDisabled : false,

    events:{
        'click .history-back': 'back',
        'click .history-prev': 'prev',
        'click .toggle-history-list': 'toggleHistoryList'
    },

    initialize :function(){
        this.collection = new HistoryItemsCollection();

        this.login = _.clone(__meta__.login);
    },

    toggleHistoryList: function(){

        var _that = this;

        if (this.visible) {
            this.$el.find('.history-list-view').hide();
            this.visible = false;
        } else {
            this.$el.find('.history-list-view').show();
            this.visible = true;
        }
    },

    start: function(){

        _log('start watching history: ', {}, _log.error);

        var _that = this;

        DataAccess.onHistoryChanged(
            {},
            function(data) {

                _log('Watch history result: ', data, _log.dataaccessOutResult);

                _that.isDisabled = false;
                _that.hideHistoryLoader();


                var event = data.event;

                // switch(event){
                //     case 'addItem':

                //         if(_.isArray(data.history.actions)){

                //             _that.render();

                //             for (var i = 0; i < data.history.actions.length; i++) {
                //                 _that.addItem(data.history.actions[i]);
                //             };

                //         }else{

                //             _that.addItem(data.history);
                //         }

                //         break;

                //     case 'goToHistoryItem':

                //         RightMenuView.instance.loadHistoryProject(data);
                    
                //         break;    
                // }

                switch(event){
                    case 'loadHistory':

                        _that.collection.reset();
                        _that.render();

                        for (var i = 0; i < data.actions.length; i++) {
                             _that.addItem(data.actions[i]);
                        };

                        break;

                    case 'addItem':

                        //_that.addItem(data.action);

                        _that.collection.reset();
                        _that.render();

                        for (var i = 0; i < data.actions.length; i++) {
                             _that.addItem(data.actions[i]);
                        };

                        DarkanEditorAplicationAPI.getInstance().projectChanged({ change:_.last(data.actions), event:{ name:'project-changed'} });

                        break;    

                    case 'goToHistoryItem':

                        var id = data.id;

                        var selectedModel = _that.collection.findWhere({ id:id });

                        _that.trigger('load-history-project', data);

                        if(selectedModel){
                            _that.selectItem(selectedModel);    
                        }

                        
                        DarkanEditorAplicationAPI.getInstance().projectChanged({ change:data.nowAction, event:{ name:'history-loaded'} });      

                        _that.projectChanged(data.nowAction);

                        break;   

                    case 'goToHistoryItemPage':

                        _log('goToHistoryItemPage', data);

                        var id = data.id;

                        var selectedModel = _that.collection.findWhere({ id:id });
                        

                        _that.trigger('load-history-page', data);

                        if(selectedModel){
                            _that.selectItem(selectedModel);
                        }

                        DarkanEditorAplicationAPI.getInstance().projectChanged({ change:data.nowAction, event:{ name:'history-loaded' } });

                        _that.projectChanged(data.nowAction);

                        break; 

                        

                    case 'deleteSitempas':

                        _that.collection.reset();
                        _that.render();

                        for (var i = 0; i < data.actions.length; i++) {
                             _that.addItem(data.actions[i]);
                        };

                        break;        

                        
                }

                
            },
            function(data) {
                _log('Watch history fault: ', data, _log.dataaccessOutFault);

                _that.isDisabled = false;
                _that.hideHistoryLoader();
            }
        );
    },

    projectChanged :function(action){

        var pagesList = ProjectView.instance.pagesList;

        switch(action.action){
            

            case 'duplicatePages':
            case 'deletePages':
            case 'addNewPage':

                DarkanEditorAplicationAPI.getInstance().pagesCollectionChanged({ pagesLength:pagesList.getPagesLength() });
            
                break;

            // case 'updateComponents':
            // case 'addComponents':
            // case 'cutComponents':
            // case 'deleteComponents':
            // case 'pasteComponents':
            // case 'updatePageOptions':

            //     break;

            // case 'sortRows':
            
            //     break;

            // case 'updatePageOptions':
            
            //     break;

            // case 'updatePageSort':
            
            //     break;

            // case 'updatePagesOptions':
            
            //     break;

            // case 'updateProjectOptions':
            
            //     break;

            // case 'updateRowOptions':
            
            //     break;

        }
    },

    remember :function( data ){

        var _that = this;





        // for (var i = this.collection.length - 1; i > this.index; i--) {
        //     var model = this.collection.at(i);


        //     this.collection.remove(model);
        // };


        // this.index++;


        // var page = data.page;
        // var action = data.action;
        // var components = '';

        // var str = new Date().getTime() + "hash" + Math.floor((Math.random() * 100000));
        // var hash = CryptoJS.MD5( str ).toString();
        // data.hash = hash;

        // if(data.component != undefined){

        //     if(data.component.toJSON != undefined){
        //         components = data.component.toJSON();
        //     }
        // }

        // if(page != undefined){
        //     if(page.toJSON != undefined){

        //         var p = page.toJSON();
        //         var s = JSON.stringify(p);

        //         p = JSON.parse(s);

        //         this.collection.add({ page:p, action:action, components:components, index:this.index, hash:hash });
        //     } else{

        //         var s = JSON.stringify(page);

        //         var p = JSON.parse(s);


        //         this.collection.add({ page:p, action:action, components:components, index:this.index, hash:hash });
        //     }


        //     this.render();
        // }
    },

    

    selectModel :function( index, data ){

        // if(data != undefined){

        //     var page = data.get('page');

        //     if(page != undefined){

        //         DataAccess.saveHistory(
        //             data,
        //             function(responce){
        //                 _log('Save history result', responce, _log.dataaccessOutResult);
        //             },
        //             function(responce){
        //                 _log('Save history fault', responce, _log.dataaccessOutFault);
        //             }
        //         )

        //         this.selectItem( data );
        //         this.setPageModel( page );
        //     }
        // }
    },

    setPageModel :function( pageJson ){


        // var pageModel = ProjectModel.instance.createPageModel(pageJson);


        // StageView.instance.setModel(pageModel);

        // RightMenuView.instance.pageListView.updatePageModelComing( pageModel );

    },

    render :function(){

        var historyListTemplate = this.template({});
        this.$el.html(historyListTemplate);

        if(this.visible){
            this.$el.find('.history-list-view').show();
        }else{
            this.$el.find('.history-list-view').hide();
        }


        return this;
    },

    addItem :function(data){

        var historyItemModel = new HistoryItemModel(data);

        this.collection.add(historyItemModel);

        //Section to show item views

        // var itemView = new HistoryItemView({ model: historyItemModel });

        // _log('list', this.$el.find('.history-list-view'));

        // var login = this.login;

        // if(historyItemModel.get('login') != login){
        //     itemView.$el.css('opacity', '.4');
        // }else{
        //     itemView.on('go-to-history-item', this.navigateToHistory, this);
        // }

        // this.$el.find('.history-list-view').append(itemView.render().$el);

        // historyItemModel.view = itemView;

        //-------------------------------

        this.selectItem(historyItemModel);
    },

    selectItem: function(itemModel){

        var login = this.login;

        if(itemModel.get('login') != login){
            return;
        }

        //Section to show item views

        // if(this.lastItemModel){
        //     this.lastItemModel.view.unselect();
        // }
        // itemModel.view.select();

        //-------------------------------

        this.lastItemModel = itemModel;
    },

    navigateToHistory: function(itemModel){

        var login = this.login;

        var userCollection = this.collection.searchStructore(login);

        if(userCollection.indexOf(itemModel) !== -1){
            this.goToHistoryItem(itemModel);
        }
    },

    goToHistoryItem: function(itemModel){

        this.isDisabled = true;

        this.showHistoryLoader();

        this.selectItem(itemModel);

        //clearTimeout(this.historyTimeout);

        //this.historyTimeout = setTimeout(function(){

            var id = itemModel.get('id');
            var direction = itemModel.get('direction');

            DataAccess.goToHistoryItem(
                {id:id, direction:direction},
                function(data) {

                    _log('Go to history item result: ', data, _log.dataaccessOutResult);

                },
                function(data) {
                    _log('Go to history item fault: ', data, _log.dataaccessOutFault);
                }
            );

        //}, 400);

    },

    back :function(){

        if(this.isDisabled){
            return;
        }

        var login = this.login;

        var userCollection = this.collection.searchStructore(login);

        //_log('userCollection', userCollection, _log.timeline);

        var id = this.lastItemModel.get('id');

        _log('back id', id);

        var lim = userCollection.findWhere( { id:id } );

        _log('back lim', lim);

        var index = userCollection.indexOf(lim);

        var itemModel = userCollection.at(index-1);

        _log('back itemModel', itemModel);

        
        if(itemModel){
            itemModel.set('direction', 'back');
            this.goToHistoryItem(itemModel);
        }
    },

    prev : function(){

        if(this.isDisabled){
            return;
        }

        var login = this.login;

        var userCollection = this.collection.searchStructore(login);

        //_log('userCollection', userCollection, _log.timeline);

       var id = this.lastItemModel.get('id');

        _log('back id', id);

        var lim = userCollection.findWhere( { id:id } );

        _log('back lim', lim);

        var index = userCollection.indexOf(lim);


        var itemModel = userCollection.at(index+1);

        _log('back itemModel', itemModel);



        if(itemModel){
            itemModel.set('direction', 'prev');
            this.goToHistoryItem(itemModel);
        }
    },

    clear: function(){

        // this.collection.reset();
        // this.index = -1;
        // this.render();

    },

    showHistoryLoader: function(){
        this.historyLoader = new HistoryLoader();
        $('body').append(this.historyLoader.render().$el);
    },

    hideHistoryLoader: function(){
        if(this.historyLoader){
            this.historyLoader.remove();
        }
    }
});

var HistoryLoader = Backbone.View.extend({

    className: 'history-loader',

    template: _.template($('#history-loader').html()),

    render: function(){
        var template = this.template(this.serializeData());
        this.$el.html(template);

        return this;
    },

    serializeData: function(){
        return {};
    }

});
