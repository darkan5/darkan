var NewPageSection = Backbone.View.extend({

	tagName: 'div',
	className: 'new-page-section-view',

	template: _.template($('#new-page-section-template').html()),

	events: {

	},

	initialize: function( ) {
    	
  	},

	render: function(dataModel){

		var template = this.template(dataModel);
        this.$el.html(template);

		return this;
	},

	serializeData: function(){
		return {};
	},

	events: function(){
        return _.extend({},WindowView.prototype.events,{
            //'click .window-close-button': 'close',
            'click .starting-page-add-blank': 'addNewBlankPage',
            'click .new-page-item-select': 'selectItem',
            'click .new-page-item-back': 'back',
            'click .new-page-item-add': 'addPage',
            'click .starting-page-import-psd': 'addPsdPage',
            'click .starting-page-import-pdf': 'addPdfPage'
        });
    },

    initialize: function( data ) {

        this.shareTemplateCollection = new NewPageItemCollection();
        this.templateCollection = new NewPageItemCollection();

        this.getTemplatesProjectsList();

        this.afterInitialize();
    },

    afterInitialize : function() {

        this.getCapabilities();
    },

    getCapabilities: function() {
        var capabilities = Capabilities.getInstance();
        capabilities.on('change', this.onCapabilitiesChanged, this);
        capabilities.getCapabilities();
    },

    onCapabilitiesChanged: function(capabilitiesModel) {

        this.capabilitiesParmasList = capabilitiesModel.createParams([
            { name:'importpdf', identifier:'.starting-page-import-pdf'},
            { name:'importpsd', identifier:'.starting-page-import-psd'}
        ]);

        var deleteEventsVisitor = DeleteEventsVisitor.getInstance();
        this.accept(deleteEventsVisitor);
        capabilitiesModel.off();
    },


    afterRender: function() {
        this.$el.find('.starting-page-icon').tooltip({
            html: true,
            animated: 'fade',
            placement: 'top'
        });
    },

    back: function(){
        this.showTemplatesList();
    },

    addPage: function(e){
        var sender = $(e.currentTarget);
        var item = JSON.parse( sender.attr('item') );

        var userId = item.userId;
        var projectId =  item.projectId;
        var pageId = item.pageId;

        //RightMenuView.instance.pageListView.addCopyPage( [pageId], userId, projectId );

        this.trigger('copy-page', [pageId], userId, projectId );
    },

    selectItem: function(e){

        var sender = $(e.currentTarget);

        var item = JSON.parse( sender.attr('item') );
        var map = item.map;

        var detailsCollection = new NewPageItemCollection();

        var dataModel = {};
        dataModel.templateCollection = undefined;
        dataModel.shareTemplateCollection = undefined;

        if (map) {
            var pages = map.pages;

            for (var i = 0; i < pages.length; i++) {

                this.createDetailTemplateList(item, i, detailsCollection );

            };   
        }

        dataModel.detailsCollection = detailsCollection.toJSON();

        this.render(dataModel);
    },

    getTemplatesProjectsList: function(){

        var _that = this;


        DataAccess.getTemplatesProjectsList(
            {},
            function(responce){
                _that.createList(responce);
            },
            function(responce){
                _log('getTemplatesProjectsList fault', responce, _log.dataaccessOutFault);
            }
        );
    },

    createList : function( data ){

        var shareTemplateProjectData = data.shareTemplateProjectData;
        var templateProjectData = data.templateProjectData;

        _log('templateProjectData', templateProjectData, _log.timeline);

        this.createTemplateList(templateProjectData, this.templateCollection);
        this.createTemplateList(shareTemplateProjectData, this.shareTemplateCollection);

        this.showTemplatesList();
    },

    showTemplatesList : function( ){

        var dataModel = {};
        dataModel.templateCollection = this.templateCollection.toJSON();
        dataModel.shareTemplateCollection = this.shareTemplateCollection.toJSON();
        dataModel.detailsCollection = undefined;

        this.render(dataModel);
    },

    showDetailsTemplatesList : function( ){

    },

    createTemplateList : function( templates, collection ){

        _log("Templates", templates);
        for (var i = 0; i < templates.length; i++) {

            var template =  templates[i];
            var map = template.map;

            if(!map || map.pages.length <= 0){
                continue;
            }


            var userId = template.user_id;
            var projectId =  template.project_id;
            var name = template.name;
            var pageId = map.pages != undefined ? map.pages[0] : 0;

            if(pageId != 0){
                var r = '?r=' + new Date().getUTCMilliseconds();

                var src = __meta__.projects_link + userId + '/' + projectId + '/pre/exported_view/' + pageId + '/pagethumb.jpg' + r;

                var newPageItemModel = new NewPageItemModel({
                    userId: userId,
                    projectId: projectId,
                    pageId : pageId,
                    name:name,
                    src: src,
                    map: map
                });

                collection.add(newPageItemModel);
            }
        };
    },

    createDetailTemplateList : function( item, page, collection ){

        var userId = item.userId;
        var projectId =  item.projectId;
        var map = item.map;
        var name = item.name;
        var pageId = map.pages[ parseInt(page) ];

        var r = '?r=' + new Date().getUTCMilliseconds();

        var src = __meta__.projects_link + userId + '/' + projectId + '/pre/exported_view/' + pageId + '/pagethumb.jpg' + r;

        var newPageItemModel = new NewPageItemModel({
            userId: userId,
            projectId: projectId,
            pageId : pageId,
            name:name,
            src: src
        });

        collection.add(newPageItemModel);
    },

    addNewBlankPage: function() {
        this.trigger('add-new-blank-page');
    },

    addPsdPage: function() {


        this.trigger('add-new-psd-page');
    },

    addPdfPage: function() {
        this.trigger('add-new-pdf-page');
    },

    accept: function(visitor) {
        visitor.visit(this);
    },

    destroy: function(){
        this.remove();
    }
});