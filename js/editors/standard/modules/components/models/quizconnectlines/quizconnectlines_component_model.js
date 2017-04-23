var QuizConnectLinesModel = ExerciseComponentModel.extend({

	defaults: function(){
        return _.extend({}, ComponentModel.prototype.defaults(),
         {
         	type:"quiz-connectlines",
         	action: 99,
         	width : 150,
	    	height : 50,
	    	buttonTitle: _lang('QMULTI_SUBMIT_LBL'),
	    	'premade-style': 'dnd-template-default',
	    	feedbackGood: _lang('FEEDBACK_GOOD_DEFAULT'),
	    	feedbackBad: _lang('FEEDBACK_BAD_DEFAULT'),
	    	attempts: '',
	    	feedbackShow: true,
	    	feedbackSign: true,
	    	answers: [ ],
	    	objs: { },
	    	opts: {
	    		afterBadAnswer: 'donothing',
	    		allowBadAnswers: true,
	    		feedbacks: true,
	    		onlySourceTarget: false
	    	},
            scoreSuccess: 0,
            scoreFail: 0,
            scoreBadAnswer: 0,

            padding: 10,
            contents: '<div style="text-align:center"><span style="font-size:18px">'+_lang('QMULTI_SUBMIT_LBL')+'</span></div>',
            'enable-scrollbar' : false,
            bgcolor: '',
            markQuestions : false,
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
    }
});