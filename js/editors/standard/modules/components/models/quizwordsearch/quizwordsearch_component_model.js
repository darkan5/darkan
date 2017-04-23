var QuizWordsearchModel = ExerciseComponentModel.extend({

	activeCellID: '0-0',

	editingMode: false,

	defaults: function(){
		return _.extend({}, ComponentModel.prototype.defaults(),
         {
         	type:"quiz-wordsearch",
         	action: 99,
         	width : 200,
	    	height : 150,
	    	answers: [
	    		{
	    			objs: [],
	    			opts: []
	    		}
	    	],
	    	objs: {
	    		'0-0': '',
	    		'0-1': '',
	    		'0-2': '',
	    		'0-3': '',
	    		'1-0': '',
	    		'1-1': '',
	    		'1-2': '',
	    		'1-3': '',
	    		'2-0': '',
	    		'2-1': '',
	    		'2-2': '',
	    		'2-3': ''
	    	},
	    	minAnswersNumber: 1,
	    	requireAnswersToAllQuestions: true,
	    	timeLimitOption: false,
	    	varToChange: '',
	    	wordSearchTimeOut: 0,
	    	userSelection: { },
            scoreSuccess: 0,
            scoreFail: 0,
            scoreBadAnswer: 0,
            feedbackGood: _lang('FEEDBACK_GOOD_DEFAULT'),
            feedbackBad: _lang('FEEDBACK_BAD_DEFAULT'),
            markQuestions : false,
            reportName: ''
         }
    	)
	},
	setActieCellID: function(cellID) {
		this.trigger('set-active-cell-id', cellID, this);
	},

    getTriggerWhenDoIt :function(){

        var triggerWhenDoIt = new TriggerActionsCollection();

        // var triggerActionModel = new TriggerActionsCollection();

        var triggerActionModelQuestions = new TriggerActionModel({ group: _lang('TRIGGER_EVENT_QUESTION'), options: [
            { name:_lang('TRIGGER_EVENT_QUESTION_PASSED'), value:'custom_questionpassed' } ,
            { name:_lang('TRIGGER_EVENT_QUESTION_FAILED'), value:'custom_questionfailed' },
            { name:_lang('TRIGGER_EVENT_ON_WORD_SELECTED_CORRECT'), value:'onWordSelectedCorrect' },

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