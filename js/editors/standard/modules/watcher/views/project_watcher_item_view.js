var ProjectWatcherItemView = Backbone.View.extend({

    tagName: "li",
    className: 'project-watcher-item-view',

    template: _.template($('#project-watcher-item-template').html()),

    events:{
 
    },

    initialize :function(){
   
    },

    render :function(){
        var template = this.template(this.model.toJSON());
        this.$el.html(template);

        return this;
    }
});