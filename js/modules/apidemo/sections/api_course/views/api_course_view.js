var ApiCourseView = ApiView.extend({

	template: _.template($('#api-course-template').html()),


    getIframeSection: function(){
        return SectionsFactory.createIframeCourseSection();
    },

    getNavigationSection: function(){
        return SectionsFactory.createNavigationCourseSection();
    },

    getEventsListSection: function(){
        return SectionsFactory.createEventsListSection();
    },

    getCommandLineSection: function(){

        return SectionsFactory.createCommandLineCourseSection();
    },

    // createDarkanApi: function(){

    //     var darkanIFrame = this.iframeView.$el.find('.iframe-editor');

    //     var src = '';

    //     darkanIFrame.attr('src', src);

    //     var darkanAPI = DarkanCourseAPI.getInstance();
    //     darkanAPI.setIframe(darkanIFrame[0]);

    //     darkanAPI.addEventListener(DarkanEditorAPI.ON_MESSAGE, this.onMessage, this);
    //     darkanAPI.addEventListener(DarkanEditorAPI.ON_CONNECT, this.onConnect, this);
    //     darkanAPI.addEventListener(DarkanEditorAPI.ON_PAGE_SELECTED, this.onPageSelected, this);
    //     darkanAPI.addEventListener(DarkanEditorAPI.ON_PROJECT_LOADED, this.onProjectLoaded);

    //     this.darkanAPI = darkanAPI;
    // },


});