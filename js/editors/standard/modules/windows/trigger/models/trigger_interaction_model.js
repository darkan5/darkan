var TriggerInteractionModel = Backbone.Model.extend({
    defaults:{
        whendoit: '',
        conditions: new TriggerIfOptionCollection(),
        elseactions: new TriggerElseOptionCollection(),
        subtriggers: new TriggerSubtriggerCollection()
    },

    selectItem : function(value){
        this.trigger('select-item', value, this);
    }
});
