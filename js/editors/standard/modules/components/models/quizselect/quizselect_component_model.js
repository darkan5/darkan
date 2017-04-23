var QuizSelectModel = ExerciseComponentModel.extend({

	defaults: function(){
		return _.extend({}, ComponentModel.prototype.defaults(),
         {
         	type:"quiz-select",
         	action: 99,
         	width : 200,
	    	height : 35,
	    	inputvalue: '',
	    	defaultValue: '',
	    	fontSize: 14,
	    	formData: {
		        selectOptions: [
		        	{
		        		option:	_lang('FORM_SELECT_NEWOPTION'),
						require: false,
						startValue:	true
		        	}
		        ]
		    },
            checkSelf: true,
            scoreSuccess: 0,
            scoreFail: 0,
            scoreBadAnswer: 0,
            feedbackGood: _lang('FEEDBACK_GOOD_DEFAULT'),
            feedbackBad: _lang('FEEDBACK_BAD_DEFAULT'),
            feedbackShow: false,
            markQuestions : true,
            reportName: ''
         }
    	)
	}
});