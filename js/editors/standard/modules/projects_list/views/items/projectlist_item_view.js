var ProjectListItemView = Backbone.View.extend({

	className: 'projectlist-item project-item',

    template: _.template($('#projectslist-item-template').html()),

    selected: false,

    initialize: function(data){


    },

    render: function(){

        this.beforRender();

    	this.model.isSelected = false;

    	var template = this.template(this.model.toJSON());
        this.$el.html(template);

        this.afterRender();

        return this;
    },

    afterRender: function(){
        // To override
    },

    beforRender: function(){
        // To override
    },

    selectItem: function(e){

    	this.trigger('select-item', e, this.model);

    	// this.model.isSelected = !this.model.isSelected;
    	// this.$el.attr('itemselected', this.model.isSelected);
    },

    unselectItem: function(e){

    	// this.model.isSelected = false;
    	// this.$el.attr('itemselected', this.model.isSelected);
    },


	setSelected: function(value){

		this.model.isSelected = value;
    	this.$el.attr('itemselected', value);
    },

    activeEditingName: function(e) {

    },

    update: function(e){
        // To override
    },

    makeDroppable: function(){
        // To override
    },

    unmakeDroppable: function(){
        // To override
    }

    
});