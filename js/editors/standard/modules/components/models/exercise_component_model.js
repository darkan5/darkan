var ExerciseComponentModel = ComponentModel.extend({

    defaults: function() {
        return _.extend({}, ComponentModel.prototype.defaults(),
            {
                'click .edit-component-button': 'startEditing'
            }
        )
    },

    startEditing: function() {
        // To override
    },

    getTriggerWhenDoIt :function(){

        var triggerWhenDoIt = new TriggerActionsCollection();

        // var triggerActionModel = new TriggerActionsCollection();

        var triggerActionModelQuestions = new TriggerActionModel({ group: _lang('TRIGGER_EVENT_QUESTION'), options: [
            { name:_lang('TRIGGER_EVENT_QUESTION_PASSED'), value:'custom_questionpassed' } ,
            { name:_lang('TRIGGER_EVENT_QUESTION_FAILED'), value:'custom_questionfailed' },
            { name:_lang('TRIGGER_EVENT_QUESTION_BADANSWER'), value:'custom_questionbadanswer' }

        ] });

        triggerWhenDoIt.add( triggerActionModelQuestions );

        var triggerActionModelTimeline = new TriggerActionModel({ group: _lang('TRIGGER_EVENT_TIMELINE'), options: [
            { name: _lang('TRIGGER_EVENT_ON_SHOW'), value: 'onShow' },
            { name: _lang('TRIGGER_EVENT_ON_HIDE'), value: 'onHide' }
        ] });

        triggerWhenDoIt.add( triggerActionModelTimeline );

        return triggerWhenDoIt.toJSON();
    }

//    getTriggerWhatToDo :function(){
//
//        return [];
//    }

});
