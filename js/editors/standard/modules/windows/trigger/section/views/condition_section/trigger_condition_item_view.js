var TriggerConditionItemView = TriggerSubtriggerItemView.extend({

    tagName: "li",
    className: 'trigger-condition-item',

    template: _.template($('#trigger-condition-item-template').html()),

    events: function(){
        return _.extend({},TriggerSubtriggerItemView.prototype.events,{
            'change .trigger-condition-varpicker': 'choiceConditionVariable',
            'change .trigger-condition-action-picker': 'choiceConditionActionPicker',
            'keyup .trigger-compare-value': 'setCompareValue',
            'change .condition-andor-action': 'choiceConditionAndorAction',
            'change .trigger-compare-value': 'setCompareValueSelect'
        });
    },

    render: function( variable ){



        var variable = this.model.get('actionType');


        var options = ProjectModel.instance.get('options');
        var projectVariables = options.get('projectVariables');
        var staticVariables = options.get('staticVariables');

        var template = this.template( { projectVariables:projectVariables, staticVariables:staticVariables, variable:variable } );
        this.$el.html(template);

        this.setValues();

        this.delegateEvents();

        return this;
    },

    setValues :function(){

        var action = this.model.get('action');
        this.$el.find('.trigger-condition-action-picker').val(action);

        var variable = this.model.get('variable');
        this.$el.find('.trigger-condition-varpicker').val(variable);

        var compareValue = this.model.get('compareValue');
        this.$el.find('.trigger-compare-value').val(compareValue);



        var andor = this.model.get('andor');
        this.$el.find('.condition-andor-action').val(andor);
    },

    choiceConditionActionPicker: function(e){

        var _that = this;

        var sender = $(e.target);
        var value = sender.val();
        var conditionType = sender.find(':selected').attr('conditiontype');

        this.model.set('action', value, { silent:true });
        this.model.set('actionType', conditionType, { silent:true });
        this.model.set('compareValue', '', { silent:true });
        this.model.trigger('change');

        this.render( conditionType );

        var index = 0;

        this.model.collection.each( function(m, i){
            if(m.cid == _that.model.cid){
                index = i;
            }
        } );

        if(index == this.model.collection.length - 1){
            this.$el.find('.condition-andor-action').css('display', 'none');
        }
    },

    choiceConditionVariable: function(e){

        var value = $(e.target).val();

        this.model.set('variable', value);
    },

    setCompareValueSelect: function(e){



        var value = $(e.target).val();
        this.model.set('compareValue', value);

    },

    setCompareValue: function(e){

        var value = $(e.target).val();

        this.model.set('compareValue', value);
    },

    choiceConditionAndorAction: function(e){

        var value = $(e.target).val();

        this.model.set('andor', value);
    }

});
