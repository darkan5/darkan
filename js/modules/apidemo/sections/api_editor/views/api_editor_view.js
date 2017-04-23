var ApiEditorView = ApiView.extend({

	template: _.template($('#api-editor-template').html()),

    getIframeSection: function(){
        return SectionsFactory.createIframeEditorSection();
    },

    getNavigationSection: function(){
        return SectionsFactory.createNavigationEditorSection();
    },

    getEventsListSection: function(){
        return SectionsFactory.createEventsListSection();
    },

    getCommandLineSection: function(){

        return SectionsFactory.createCommandLineEditorSection();
    },

    createDarkanApi: function(onResult){

        var _that = this;


        var darkanIFrame = this.iframeView.$el.find('.iframe-editor');
        var darkanAPI = DarkanEditorAPI.getInstance();
        darkanAPI.setIframe(darkanIFrame[0]);
        
        darkanIFrame.on('scroll', function(e) {e.preventDefault(); e.stopPropagation(); });

        darkanAPI.addEventListener(DarkanEditorAPI.ON_MESSAGE, this.onMessage, this);
        darkanAPI.addEventListener(DarkanEditorAPI.ON_CONNECT, this.onConnect, this);
        darkanAPI.addEventListener(DarkanEditorAPI.ON_PAGE_ADDED, this.onPageAdded);
        darkanAPI.addEventListener(DarkanEditorAPI.ON_PAGES_REMOVED, this.onPagesRemoved, this);
        darkanAPI.addEventListener(DarkanEditorAPI.ON_PAGE_SELECTED, this.onPageSelected, this);
        darkanAPI.addEventListener(DarkanEditorAPI.ON_PROJECT_LOADED, this.onProjectLoaded);
        darkanAPI.addEventListener(DarkanEditorAPI.ON_PAGES_COLLECTION_CHANGED, this.onPagesCollectionChenged, this);
        darkanAPI.addEventListener(DarkanEditorAPI.ON_PROJECT_CHANGED, this.onProjectChanged, this);

        this.darkanAPI = darkanAPI;

        DataAccess.getHashedApikey(
            {},
            function(data){

                _log('generateToken result', data);
                
                var status = data.status;

                if(status != 'success'){
                    _log('No hashed apikey');
                    return;
                }

                var hashedApikey = data.hashedApikey;

                if(!hashedApikey){
                    _log('No hashed apikey');
                    return;
                }

                darkanAPI.setCredentials({ apikey:hashedApikey });

                onResult(darkanAPI);
                
            },
            function(data){
                _log('generateToken fault', data);
            }
        );

        
    },

});