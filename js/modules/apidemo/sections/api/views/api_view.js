var ApiView = Backbone.View.extend({

	template: _.template($('#api-template').html()),

    className: 'api-view',

    events: {
        'close': 'close',
        'click .window-close-button': 'close'
    },

    bindings: {
        '.window-top-bar': 'title'
    },

    initialize: function(){

    },

    render: function(){

    	var template = this.template(this.serializeData());
        this.$el.html(template);

        this.createSections();


        return this;
    },

    serializeData: function(){
    	return this.model.toJSON();
    },

    onClose : function(){
        // To override
    },

    close : function(){

        this.onClose();
        this.unbind();
        this.remove();
    },

    createSections: function(){

        this.createIframeView();
        this.createNavigationView();
        this.createEventsListView();
        this.createCommandLineView();
    },

    createIframeView: function(){
        this.iframeView = this.getIframeSection();
        this.$el.find('.iframe-wrapper').html(this.iframeView.render().$el);
    },

    createNavigationView: function(){
        this.navigationView = this.getNavigationSection();
        this.navigationView.on('go-to-next-page', this.goToNextPage, this);
        this.navigationView.on('go-to-prev-page', this.goToPrevPage, this);
        this.$el.find('.navigation-wrapper').html(this.navigationView.render().$el);
    },

    createEventsListView: function(){
        this.eventsListView = this.getEventsListSection();
        this.$el.find('.events-list-wrapper').html(this.eventsListView.render().$el);
    },

    createCommandLineView: function(){

        this.commandLine = this.getCommandLineSection();
        this.commandLine.on('execte-command', this.execteCommand, this);
        this.$el.find('.console-wrapper').html(this.commandLine.render().$el);
    },

    getIframeSection: function(){
        return SectionsFactory.createIframeSection();
    },

    getCommandLineSection: function(){
        return SectionsFactory.createCommandLineSection();
    },

    getEventsListSection: function(){
        return SectionsFactory.createEventsListSection();
    },

    getNavigationSection: function(){
        return SectionsFactory.createNavigationSection();
    },

    execteCommand: function(model){

        var command = model.get('command');

        _log('command', command);

        try{
            jCommand = JSON.parse(command);

            _log('jCommand', jCommand);

            _log('this.darkanAPI', this.darkanAPI);
            _log('this.darkanAPI', this.darkanAPI.execteCommand);

            var result = this.darkanAPI.execteCommand(jCommand);

            this.eventsListView.appendEvent(result, EventsListView.COMMAND_TYPE);

         }catch(ex){

            this.commandLine.setAsErrorParse();
         }
    },


    createDarkanApi: function(onResult){

        var darkanAPI = {
            execteCommand:function(){

            },
            goToNextPage:function(){

            },
            goToPrewPage:function(){

            },
            goToPrewPage:function(){

            },
            loadProject: function(){

            }
        }

        this.darkanAPI = darkanAPI;
        onResult(darkanAPI)
    },

    onMessage: function (e){

        this.eventsListView.appendEvent(e);
    },

    onConnect: function (e){

    },

    onPageAdded: function (e){
         //console.log('darkanAPI onPageAdded', e);
    },

    onPagesRemoved: function (e){
         //console.log('darkanAPI on connect', e);
    },

    onPageSelected: function (e){
         //console.log('darkanAPI onPageSelected', e);
    },

    onProjectLoaded: function (e){
         //console.log('darkanAPI onProjectLoaded', e);
    },

    onPagesCollectionChenged: function (e){
         //console.log('darkanAPI onProjectLoaded', e);
    },

    onProjectChanged: function (e){
         console.log('___________________ darkanAPI onProjectChenged', e);
    },

    openProject: function(projectItemModel){

        var _that = this;

        var darkanProjectId = projectItemModel.get('project_id');

        if(darkanProjectId){

            this.createDarkanApi( function(darkanAPI){

                _that.darkanAPI = darkanAPI;

                darkanAPI.loadProject({ darkanProjectId:darkanProjectId });

            });
        }
    },

    goToNextPage: function(){
        var result = this.darkanAPI.goToNextPage();
        this.eventsListView.appendEvent(result, EventsListView.COMMAND_TYPE);
    },

    goToPrevPage: function(){
        var result = this.darkanAPI.goToPrewPage();
        this.eventsListView.appendEvent(result, EventsListView.COMMAND_TYPE);
    },

    

});