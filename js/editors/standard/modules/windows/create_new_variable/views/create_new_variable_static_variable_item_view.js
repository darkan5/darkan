var CreateNewVariableStaticVariableItemView = Backbone.View.extend({

    tagName: "li",
    className: 'create-new-variable-item',

    template: _.template($('#create-new-variable-static-variable-item-template').html()),

    events: function(){
        return _.extend({},TriggerSubtriggerItemView.prototype.events,{
            'click .variable-name' : 'selectText',
            'keydown .variable-name' : 'readOnlyInput'
        });
    },

    readOnlyInput: function(e){
        if (e.ctrlKey && e.keyCode == 67) {
            
        } else {
            e.preventDefault();
            return false;
        }
    },

    selectText: function(e){
        $(e.target).select();
    },


    render: function(){

        var template = this.template( this.model.toJSON() );
        this.$el.html(template);

        this.delegateEvents();

        return this;
    },

});

