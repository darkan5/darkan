var TriggerSectionView = Backbone.View.extend({

    tagName: "div",
    className: 'trigger-section',

    template: _.template($('#trigger-section-template').html()),

    render: function(){

        var template = this.template(this.model.toJSON());
        this.$el.html(template);

        return this;
    },

    setCollection: function(collection){

    }

//    show: function(){
//        this.$el.show();
//    },
//
//    hide: function(){
//        this.$el.hide();
//    }
});
