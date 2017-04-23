var EmptyStageView = ItemView.extend({

    className: 'stage-view-wrapper empty-stage-view-wrapper',

    template: _.template($('#empty-stage-view-template').html()),

    initialize: function(){

    },

    renderStage: function(){

    	var template = this.template(this.serializeData());
        this.$el.html(template);

    	return this;
    },

    render: function(){

    	var template = this.template(this.serializeData());
        this.$el.html(template);

    	return this;
    },

    afterRender: function(){

    },

    setModel: function(){

    },

    serializeData: function(){
    	return {};
    },

});