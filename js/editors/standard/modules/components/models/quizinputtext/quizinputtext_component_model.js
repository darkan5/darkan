var QuizInputTextModel = ExerciseComponentModel.extend({

	defaults: function(){
      return _.extend({}, ComponentModel.prototype.defaults(),
         {
         	type:"quiz-inputtext",
         	action: 99,
         	width : 200,
   	    	height : 35,
   	    	inputvalue: '',
   	    	placeholder: '',
   	    	defaultValue: '',
   	    	goodAnswers: '',
   	    	caseSensitive: false,
   	    	fontSize: 14,
   	    	maxLength: 100,
   	    	textAlign: 'left',
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