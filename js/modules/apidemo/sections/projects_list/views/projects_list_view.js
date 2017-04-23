var ProjectsListView = Backbone.View.extend({

    className: 'projects-list',

	template: _.template($('#projects-list-template').html()),

    initialize: function(){

        this.collection = new ProjectsItemsCollection(projectsFromDb || []);
        
    },

    render: function(){

    	var template = this.template(this.serializeData());
        this.$el.html(template);

        this.renderProjectsList();

        return this;
    },

    serializeData: function(){
    	return {};
    },

    renderProjectsList: function(){


        this.collection.each(this.renderOneItem, this);

        this.addPlusButton();

    },

    renderOneItem: function(projectItemModel){

        var projectsListItemView = new ProjectsListItemView({model:projectItemModel});
        projectsListItemView.on('open-project-to-edit', this.openProjectToEdit, this);
        projectsListItemView.on('open-project-to-course', this.openProjectToCourse, this);
        projectsListItemView.on('publish-project', this.publishProject, this);
        this.$el.find('.projects-list-items').append(projectsListItemView.render().$el);

        return projectsListItemView;
    },

    addPlusButton: function(){

        var plusButtonView = new ProjectsListPlusButtonView();
        plusButtonView.on('create-new-project', this.createNewProject, this);
        this.$el.find('.projects-list-items').append(plusButtonView.render().$el);
    },

    addProject: function(projectItemModel){

        this.collection.add(projectItemModel);

        this.render();

        projectItemModel.view.select();
    },

    createNewProject: function(){
        this.trigger('create-new-project');
    },

    openProjectToEdit: function(projectItemModel){
        this.trigger('open-project-to-edit', projectItemModel);
    },

    openProjectToCourse: function(projectItemModel){
        this.trigger('open-project-to-course', projectItemModel);
    },

    publishProject: function(projectItemModel){
        this.trigger('publish-project', projectItemModel);
    },

    getItemsCollection: function(){
        return this.collection;
    },

    selectFirstItem: function(){
        var firstModel = this.collection.first();
        if(firstModel){
            firstModel.view.openProject();
        }
    }
});