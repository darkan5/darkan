var QuizModel = ExerciseComponentModel.extend({

	defaults: function(){

		return _.extend({}, ExerciseComponentModel.prototype.defaults(),
         {
         	type:"quiz",
         	action: 99,
         	width : 400,
	    	height : 200,
	    	backgroundColor: '',
	    	textColor: '',
	    	buttonBackgroundColor: '',
	    	buttonTextColor: '',
	    	feedbackShow: true,
	    	feedbackSign: true,
	    	// titleShow: true,
	    	buttonShow: true,
	    	feedbackGood: _lang('FEEDBACK_GOOD_DEFAULT'),
	    	feedbackBad: _lang('FEEDBACK_BAD_DEFAULT'),
	    	multiselect: true,
	    	// title: 'Tytuł',
	    	incrementQuestion : 2,
	    	attempts : '',
	    	'premade-style': 'qmulti-template-default',
	    	submitButton: {
				left: 275,
				top: 120,
				text: _lang('QMULTI_SUBMIT_LBL')
	    	},
	    	answers : {
	    		'#0' : {
	    			text : _lang('QMULTI_ANSWER_LBL') + ' 1',
	    			goodAnswer : true,
	    			left: 50,
	    			top: 30,
	    			choosen: false
	    		},
	    		'#1' : {
	    			text : _lang('QMULTI_ANSWER_LBL') + ' 2',
	    			goodAnswer : false,
	    			left: 50,
	    			top: 65,
	    			choosen: false
	    		}
	    	},
	    	scoreSuccess: 0,
	    	scoreFail: 0,
	    	scoreBadAnswer: 0,
	    	markQuestions : true,
	    	reportName: '',
	    	fontSize: 16
         }
	    )
	},

    createStylesObject: function() {
		var styles = {
			"quiz-body": {
				"background": "rgba(0, 0, 0, 0.7)",
			    "border-radius": "10px",
			    "color": "#fff"
			},

			"quiz-submit-button": {
				"background": "#5082A5",
			    "color": "#fff",
			    "border": "none"
			}
		};

        return styles;
    }
});

var QuizRadioModel = ExerciseComponentModel.extend({

	defaults: function(){
		return _.extend({}, ExerciseComponentModel.prototype.defaults(),
         {
         	type:"quiz",
         	action: 99,
         	width : 400,
	    	height : 200,
	    	backgroundColor: '',
	    	textColor: '',
	    	buttonBackgroundColor: '',
	    	buttonTextColor: '',
	    	feedbackShow: true,
	    	feedbackSign: true,
	    	// titleShow: true,
	    	buttonShow: true,
	    	feedbackGood: _lang('FEEDBACK_GOOD_DEFAULT'),
	    	feedbackBad: _lang('FEEDBACK_BAD_DEFAULT'),
	    	multiselect: false,
	    	// title: 'Tytuł',
	    	incrementQuestion : 2,
	    	attempts : '',
	    	'premade-style': 'qmulti-template-default',
	    	submitButton: {
				left: 275,
				top: 120,
				text: _lang('QMULTI_SUBMIT_LBL')
	    	},
	    	answers : {
	    		'#0' : {
	    			text : _lang('QMULTI_ANSWER_LBL') + ' 1',
	    			goodAnswer : true,
	    			left: 50,
	    			top: 30,
	    			choosen: false
	    		},
	    		'#1' : {
	    			text : _lang('QMULTI_ANSWER_LBL') + ' 2',
	    			goodAnswer : false,
	    			left: 50,
	    			top: 65,
	    			choosen: false
	    		}
	    	},
	    	markQuestions : true,
	    	fontSize: 16
        }
	    )
	},

    createStylesObject: function() {
		var styles = {
			"quiz-body": {
				"background": "rgba(0, 0, 0, 0.7)",
			    "border-radius": "10px",
			    "color": "#fff"
			},

			"quiz-submit-button": {
				"background": "#5082A5",
			    "color": "#fff",
			    "border": "none"
			}
		};

        return styles;
    }
});

var QuizTrueFalseModel = ExerciseComponentModel.extend({

	defaults: function(){
		return _.extend({}, ExerciseComponentModel.prototype.defaults(),
         {
         	type:"quiz",
         	action: 99,
         	width : 400,
	    	height : 200,
	    	backgroundColor: '',
	    	textColor: '',
	    	buttonBackgroundColor: '',
	    	buttonTextColor: '',
	    	feedbackShow: true,
	    	feedbackSign: true,
	    	// titleShow: true,
	    	buttonShow: true,
	    	feedbackGood: _lang('FEEDBACK_GOOD_DEFAULT'),
	    	feedbackBad: _lang('FEEDBACK_BAD_DEFAULT'),
	    	multiselect: false,
	    	// title: 'Tytuł',
	    	incrementQuestion : 2,
	    	attempts : '',
	    	'premade-style': 'qmulti-template-default',
	    	submitButton: {
				left: 275,
				top: 120,
				text: _lang('QMULTI_SUBMIT_LBL')
	    	},
	    	answers : {
	    		'#0' : {
	    			text : _lang('QMULTI_TRUE'),
	    			goodAnswer : true,
	    			left: 50,
	    			top: 30,
	    			choosen: false
	    		},
	    		'#1' : {
	    			text : _lang('QMULTI_FALSE'),
	    			goodAnswer : false,
	    			left: 50,
	    			top: 65,
	    			choosen: false
	    		}
	    	},
	    	markQuestions : true,
	    	fontSize: 16
         }
         
	    )
	},

    createStylesObject: function() {
		var styles = {
			"quiz-body": {
				"background": "rgba(0, 0, 0, 0.7)",
			    "border-radius": "10px",
			    "color": "#fff"
			},

			"quiz-submit-button": {
				"background": "#5082A5",
			    "color": "#fff",
			    "border": "none"
			}
		};

        return styles;
    }
});

var QuizSelectOneModel = ExerciseComponentModel.extend({

	defaults: function(){
		return _.extend({}, ExerciseComponentModel.prototype.defaults(),
         {
         	type:"quiz-selectone",
         	action: 99,
         	width : 700,
	    	height : 150,
	    	backgroundColor: '',
	    	textColor: '',
	    	buttonBackgroundColor: '',
	    	buttonTextColor: '',
	    	feedbackShow: true,
	    	feedbackSign: true,
	    	// titleShow: true,
	    	buttonShow: true,
	    	feedbackGood: _lang('FEEDBACK_GOOD_DEFAULT'),
	    	feedbackBad: _lang('FEEDBACK_BAD_DEFAULT'),
	    	multiselect: true,
	    	// title: 'Tytuł',
	    	incrementQuestion : 2,
	    	attempts : '',
	    	'premade-style': 'selectone-template-default',
	    	answers : {
	    		'#0' : {
	    			text : _lang('QMULTI_TRUE'),
	    			goodAnswer : true,
	    			left: 50,
	    			top: 50,
	    			choosen: false
	    		},
	    		'#1' : {
	    			text : _lang('QMULTI_FALSE'),
	    			goodAnswer : false,
	    			left: 400,
	    			top: 50,
	    			choosen: false
	    		}
	    	},
	    	markQuestions : true,
	    	fontSize: 16
         }
	    )
	},

    createStylesObject: function() {
		var styles = {
			"quiz-body": {
				"background": "rgba(0, 0, 0, 0.7)",
			    "border-radius": "10px",
			    "color": "#000"
			},

			"quiz-submit-button": {
				"background": "#5082A5",
			    "color": "#000",
			    "border": "none"
			}
		};

        return styles;
    }
});