var IframeView = Backbone.View.extend({

	template: _.template($('#iframe-template').html()),

    initialize: function(){

    },

    render: function(){

    	var template = this.template(this.serializeData());
        this.$el.html(template);

        return this;
    },

    serializeData: function(){
    	return {};
    },

});