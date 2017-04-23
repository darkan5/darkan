var QuizFillInBlanksModel = ExerciseComponentModel.extend({

	defaults: function(){
		return _.extend({}, ExerciseComponentModel.prototype.defaults(),
         {
         	type:"quiz-fillinblanks",
         	action: 99,
         	width : 300,
	    	height : 120,
	    	backgroundColor: '',
	    	textColor: '',
	    	buttonBackgroundColor: '',
	    	buttonTextColor: '',
	    	feedbackShow: true,
	    	feedbackSign: true,
	    	// titleShow: true,
	    	buttonShow: true,
	    	feedbackGood: '',
	    	feedbackBad: '',
	    	multiselect: true,
	    	// title: 'Tytuł',
	    	incrementQuestion : 2,
	    	answers : {
			    		
		        '#1' : {
	                placeholder : '',
	                type : 'input',
	                goodanswers : [
	                	{
				            text: 'darkan',
				            iscorrect: true	
	                	}
	                ]
		        }
		        
	    	},
            scoreSuccess: 0,
            scoreFail: 0,
            scoreBadAnswer: 0,
            feedbackGood: _lang('FEEDBACK_GOOD_DEFAULT'),
            feedbackBad: _lang('FEEDBACK_BAD_DEFAULT'),
            markQuestions : false,
            reportName: '',
            padding: 10,
            contents: '<span style="font-size:18px">'+_lang('SIMPLETEXT_INSERTTEXT')+' <input aid="1"></span>',
         	'enable-scrollbar' : false,
            bgcolor: '',
            checkSelf: false

         }
    	)
	},

    setTextEditor: function(el) {
    	this.trigger('set-text-editor', el);
    }
});