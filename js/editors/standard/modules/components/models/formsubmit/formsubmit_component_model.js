var FormSubmitModel = ExerciseComponentModel.extend({

	defaults: function(){
    return _.extend({}, ComponentModel.prototype.defaults(),
      {
      	 type:"form-submit",
      	 action: 99,
      	 width : 180,
	     height : 45,
         buttonTitle: _lang('QMULTI_SUBMIT_LBL'),
         feedbacks: true,
         feedbackShow: true,
         feedbackGood: _lang('FEEDBACK_GOOD_DEFAULT'),
         feedbackBad: _lang('FEEDBACK_BAD_DEFAULT'),
	     formFields: [ ],
	     'premade-style': 'dnd-template-default',

          padding: 10,
          contents: '<div style="text-align:center"><span style="font-size:18px">'+_lang('QMULTI_SUBMIT_LBL')+'</span></div>',
          'enable-scrollbar' : false,
          bgcolor: '',
          reportName: ''
      }
     )
    },

    createStylesObject: function() {
         var styles = {
            'component-inner': {
               'background': '#5082A5',
               'color': '#fff',
               'border': 0
            }
         };

        return styles;
    },

    getTriggerWhenDoIt :function(){

        var triggerWhenDoIt = new TriggerActionsCollection();

        // var triggerActionModel = new TriggerActionsCollection();

        var triggerActionModelQuestions = new TriggerActionModel({ group: _lang('TRIGGER_EVENT_QUESTION'), options: [
            { name:_lang('TRIGGER_EVENT_QUESTIONS_PASSED'), value:'custom_questionpassed' } ,
            { name:_lang('TRIGGER_EVENT_QUESTIONS_FAILED'), value:'custom_questionfailed' }

        ] });

        triggerWhenDoIt.add( triggerActionModelQuestions );

        var triggerActionModelTimeline = new TriggerActionModel({ group: _lang('TRIGGER_EVENT_TIMELINE'), options: [
            { name: _lang('TRIGGER_EVENT_ON_SHOW'), value: 'onShow' },
            { name: _lang('TRIGGER_EVENT_ON_HIDE'), value: 'onHide' }
        ] });

        triggerWhenDoIt.add( triggerActionModelTimeline );

        return triggerWhenDoIt.toJSON();
    }
});