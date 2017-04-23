var TimelineRowOptionsModel =  Backbone.Model.extend({
    defaults:{
        id: 0,
        hidden: false,
        locked: false,
        delay: 0
    }
});

var TimelineRowModel = Backbone.Model.extend({
	defaults:{
		objects: new TimelineItemCollection(),
        options: new TimelineRowOptionsModel(),
        type: 'line',
        action: ''
	},


	addExistingComponent: function(componentModel) {
		this.get('objects').add(componentModel);
	},

	addNewComponent: function(componentModel) {



		this.get('objects').add(componentModel, {at:0});

	},

    removeComponent: function( componentModel ) {
        this.get('objects').remove(componentModel);
        this.trigger('remove-coming', componentModel);
    },

    updateSortComing: function( model, position ){
        this.trigger('update-sort-coming', model, position);
    },

    updateOptionComing: function( options ){
        this.trigger('update-options-coming', options);
    },

    setActive :function( value ){

        this.trigger('set-active', value, this);
    },

    selectedByMiniature: function(value){
        this.trigger('selected-by-miniature', value);
    },

    selectedByTrigger : function(value){
        this.trigger('selected-by-trigger', value);
    },

    selectedByPickerMiniature: function(value){
        this.trigger('selected-by-picker-miniature-1', value);
    },
});