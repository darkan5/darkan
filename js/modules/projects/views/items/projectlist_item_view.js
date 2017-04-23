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

        var _that = this;

        e.stopPropagation();
        e.stopImmediatePropagation(); 

        var newInput = $('<input name="pagename" class="timeline-row-edit-name-input-layers"  type="text">');
        
        var label = $(e.target);

        var name = this.model.get('name');  

        label.html('').append(newInput);

        newInput.focus();
        newInput.val(name);

        newInput.on('focusout', function(e2){

            var value = $(e2.target).val();

            if(value != name){
                _that.model.set('name', value);

                _that.update();
            }

            _that.delegateEvents();

            _that.render();
            
        });

        newInput.on('keyup', function(e2){
            if(e2.which  == 13){
                $(this).trigger('focusout');
            }
        });

        newInput.on('click mousedown mouseup', function(e2){
            e2.stopPropagation(); 
            e2.stopImmediatePropagation(); 
        });

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