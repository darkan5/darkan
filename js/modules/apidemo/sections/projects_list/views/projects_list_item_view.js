var ProjectsListItemView = Backbone.View.extend({

    className: 'projects-list-item',

	template: _.template($('#projects-list-item-template').html()),

    events:{
        'click .open-project': 'openProject',
        'click .publish-project': 'publishProject' 
    },

    bindings:{
        '.project-to-edit': 'toEdit'
    },

    initialize: function(){
        this.model.view = this;
    },

    render: function(){

    	var template = this.template(this.serializeData());
        this.$el.html(template);

        this.stickit();

        return this;
    },

    serializeData: function(){
    	return this.model.toJSON();
    },

    openProject: function(){

        this.select();

        if(this.model.get('toEdit')){
            this.trigger('open-project-to-edit', this.model);
        }else{
            this.trigger('open-project-to-course', this.model);
        }
    },

    publishProject: function(){
        this.trigger('publish-project', this.model);
    },

    select: function(){

        this.model.collection.each(function(model){
            model.view.$el.attr('projectselected', false);
        });

        this.$el.attr('projectselected', true);
    },

    setPublishLink: function(link){

        this.model.set('link', link);
        this.render();

        var a = this.$el.find('.download-published-project-link');
        a[0].click();
    }
});