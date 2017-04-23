var ProjectsListSection = Backbone.View.extend({

	tagName: 'div',
	className: 'projects-list-section',

	template: _.template($('#projects-list-section-template').html()),

	events: {
        'keyup .projects-list-search-input' : 'searchProjectList',
        'paste .projects-list-search-input' : 'searchProjectList',
        'click .remove-search-value' : 'removeSearchValue',
	},

	initialize: function( ) {
    	this.collection = new ExistingProjectsCollection();
  	},

	render: function(){

		var template = this.template(this.serializeData());
        this.$el.html(template);
   

		return this;
	},

	serializeData: function(){
		return {};
	},

	afterRender: function(){
        //this.getAllProjects();
		this.createProjectsList();
	},

    removeSearchValue: function(e){

        var searchInput = this.$el.find('.projects-list-search-input');

        searchInput.val('');
        searchInput.focus();

        this.search("");
        
    },

    searchProjectList: function(e){

        var value = $(e.target).val();

        this.search(value);
    },

    search: function(value){

        // this.searchValue = value;

        // this.renderFolderStructure();


        var collection = this.getProjectsBySearchValue(value);
        this.renderList(collection, value);
    },

    getProjectsBySearchValue: function( value ) {

        return this.collection.searchStructore(value);
    },

    createProjectsList: function(){
        var projectListController = new ProjectListController();
        projectListController.on('open-project', this.openProject, this);
        this.$el.html(projectListController.render().$el);
        projectListController.afterRender();
    },

	getAllProjects: function(){

        var _that = this;

        DataAccess.getAllProjectsList(
            {},
            function(data) {

            	_log('Get All Projects List fault: ', data, _log.dataaccessOutResult);

//                 _that.secondPageListView = new SecondPagesListView( { data:data } );
//                 //_that.secondPageListView.off('get-project-by-id');
//                 _that.secondPageListView.on('get-project-by-id', function(data){
//                     _that.getProjectById(data);
//                 });

// //                _that.secondPageListView.on('copy-pages', function(data){
// //                    _that.copyPages(data);
// //                });

//                 _that.secondPageListView.on('onsetpage', function(model){
//                     _that.canEdit = false;
//                     _that.trigger('set-second-page', model, this);
//                 });

//                 _that.secondPageListView.on('on-copy-page', function(data){

//                     _that.goToTab(0);

//                     _that.onCopyPage(data);
//                 });

				var shareProjectData = data.shareProjectData || [];
		    	var shareTemplateProjectData = data.shareTemplateProjectData || [];
		    	var templateProjectData = data.templateProjectData || [];
		    	var userProjectData = data.userProjectData || [];

				_that.createList(shareProjectData, '0');
				_that.createList(shareTemplateProjectData, '1');
				_that.createList(templateProjectData, '2');
				_that.createList(userProjectData, '3');

            },
            function(data) {
                _log('Get All Projects List fault: ', data, _log.dataaccessOutFault);
            }
        );
    },

    createList: function(list, type){
    	

    	for (var i = 0; i < list.length; i++) {
    		var item = list[i];

            var projectsListItemModel = new ProjectsListItemModel(item);
            projectsListItemModel.set('pType', type);

            //_log('projectsListItemModel', projectsListItemModel);

            this.collection.add(projectsListItemModel);

    	};

        //_log('this.collection', this.collection);

        this.renderList(this.collection, "");
    },

    renderList: function(collection, value){

        this.$el.find('.news-project-data').html('');
        this.$el.find('.share-project-data').html('');
        this.$el.find('.share-template-project-data').html('');
        this.$el.find('.template-project-data').html('');
        this.$el.find('.user-project-data').html('');

        collection.each(this.renderOneProject, this);

        this.renderNewsList(collection);

    },

    renderNewsList: function(collection){

         _log('collection.toArray()', collection.toArray());

        var news = new ExistingProjectsCollection(collection.toArray());
        news.comparator = function(model) {
            return model.get('date');
        }

        news.sort();

        _log('news', news);

        for (var i = 0; i < 10; i++) {
            var model = news.at(i);

            _log('model', model);

            if(!model){
                break;
            }

            this.renderOneNewProject(model);   

        };
    },

    renderOneNewProject: function(model){


        var projectsListItem = new ProjectsListItem({model:model});
        projectsListItem.on('open-project', this.openProject, this);
        var container = this.$el.find('.news-project-data');
        container.append(projectsListItem.render().$el);
        projectsListItem.afterRender();
    },

    renderOneProject: function(model){

        var _that = this;

        var projectsListItem = new ProjectsListItem({model:model});
        projectsListItem.on('open-project', this.openProject, this);
        
        var pType = model.get('pType');

        //_log('pType', pType);

        switch(pType){
            case '0':

                var container = _that.$el.find('.share-project-data');
                container.append(projectsListItem.render().$el);
                projectsListItem.afterRender();

                break;

            case '1':

                var container = _that.$el.find('.share-template-project-data');
                container.append(projectsListItem.render().$el);
                projectsListItem.afterRender();

                break;

            case '2':

                var container = _that.$el.find('.template-project-data');
                container.append(projectsListItem.render().$el);
                projectsListItem.afterRender();

                break;

            case '3':

                var container = _that.$el.find('.user-project-data');
                container.append(projectsListItem.render().$el);
                projectsListItem.afterRender();

                break;
        }
    },

    openProject: function(model){
		this.trigger('open-project', model);
	},

	destroy: function(){
        this.$el.parent().remove();
        this.remove();

    }

});