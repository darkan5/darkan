var CreateNewVariableItemView = Backbone.View.extend({

    tagName: "li",
    className: 'create-new-variable-item',

    template: _.template($('#create-new-variable-project-variable-item-template').html()),

    events: function(){
        return _.extend({},TriggerSubtriggerItemView.prototype.events,{
            'keyup .create-new-variable-item-name': 'changeValueName',
            'keyup .create-new-variable-item-value': 'changeValueValue',
            'click .create-new-variable-delete-button': 'deleteVariable',
            'drop-item' : 'dropItem'
        });
    },

    dropItem: function(event, index) {
        this.$el.trigger('update-sort', [this.model, index]);
    },

    render: function(){

        var template = this.template( this.model.toJSON() );
        this.$el.html(template);

        this.setValues();

        this.delegateEvents();

        return this;
    },

    setValues: function(){

    },

    changeValueName: function(e){

        var value = $(e.target).val();
        this.model.set('pvarname', value);

        this.$el.trigger('update-changes', this.model, this);
    },

    changeValueValue: function(e){

        var value = $(e.target).val();
        this.model.set('pvarvalue', value);

        this.$el.trigger('update-changes', this.model, this);
    },

    deleteVariable: function(){
        this.$el.trigger('delete-variable', this.model, this);
    }


});

