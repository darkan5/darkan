var CrosswordModel = ExerciseComponentModel.extend({

	activeCellID: '0-0',

    imagesExtensions: [],
    soundsExtensions: [],

	defaults: function(){
		return _.extend({}, ComponentModel.prototype.defaults(),
         {
         	type:"crossword",
         	action: 99,
         	width : 200,
	    	height : 150,
	    	colorizeCrosswordAfterWriteLastWord: false,
	    	colorizeGoodAnswer: true,
	    	colorizeGoodWord: true,
	    	fieldType: 'text',
	    	minAnswersNumber: 1,
	    	ob: {},
	    	objs: {
	    		'0-0': {
	    			type: 'answer',
	    			text: '',
	    			gender: '',
	    			opts: {
    					questionType: 'text',
    					soundFile: '',
    					imageFile: ''
	    			}
	    		},
	    		'0-1': {
	    			type: 'answer',
	    			text: '',
	    			gender: '',
	    			opts: {
    					questionType: 'text',
    					soundFile: '',
    					imageFile: ''
	    			}
	    		},
	    		'0-2': {
	    			type: 'answer',
	    			text: '',
	    			gender: '',
	    			opts: {
    					questionType: 'text',
    					soundFile: '',
    					imageFile: ''
	    			}
	    		},
	    		'0-3': {
	    			type: 'answer',
	    			text: '',
	    			gender: '',
	    			opts: {
    					questionType: 'text',
    					soundFile: '',
    					imageFile: ''
	    			}
	    		},
	    		'1-0': {
	    			type: 'answer',
	    			text: '',
	    			gender: '',
	    			opts: {
    					questionType: 'text',
    					soundFile: '',
    					imageFile: ''
	    			}
	    		},
	    		'1-1': {
	    			type: 'answer',
	    			text: '',
	    			gender: '',
	    			opts: {
    					questionType: 'text',
    					soundFile: '',
    					imageFile: ''
	    			}
	    		},
	    		'1-2': {
	    			type: 'answer',
	    			text: '',
	    			gender: '',
	    			opts: {
    					questionType: 'text',
    					soundFile: '',
    					imageFile: ''
	    			}
	    		},
	    		'1-3': {
	    			type: 'answer',
	    			text: '',
	    			gender: '',
	    			opts: {
    					questionType: 'text',
    					soundFile: '',
    					imageFile: ''
	    			}
	    		},
	    		'2-0': {
	    			type: 'answer',
	    			text: '',
	    			gender: '',
	    			opts: {
    					questionType: 'text',
    					soundFile: '',
    					imageFile: ''
	    			}
	    		},
	    		'2-1': {
	    			type: 'answer',
	    			text: '',
	    			gender: '',
	    			opts: {
    					questionType: 'text',
    					soundFile: '',
    					imageFile: ''
	    			}
	    		},
	    		'2-2': {
	    			type: 'answer',
	    			text: '',
	    			gender: '',
	    			opts: {
    					questionType: 'text',
    					soundFile: '',
    					imageFile: ''
	    			}
	    		},
	    		'2-3': {
	    			type: 'answer',
	    			text: '',
	    			gender: '',
	    			opts: {
    					questionType: 'text',
    					soundFile: '',
    					imageFile: ''
	    			}
	    		}
	    	},
	    	opts: {},
	    	qcrosswordTimeout: 0,
	    	requireAnswersToAllQuestions: true,
	    	timeLimitOption: false,
	    	varToChange: '',
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
	uploadImage: function(data) {
		this.trigger('upload-image', data);
	},
	uploadSound: function(data) {
		this.trigger('upload-sound', data);
	},

    setFileName: function(data) {
        // to override

    	var objs = this.get('objs');
    	objs[this.activeCellID].opts.imageFile = data.fileName;
    	this.set('objs', objs);
    	this.trigger('change');
    },

    setSoundFileName: function(data) {

    	var objs = this.get('objs');
    	objs[this.activeCellID].opts.soundFile = data.fileName;
    	this.set('objs', objs);
    	this.trigger('change');

    },

    getAcceptTypeFormat: function() {
        var _mainTypes = this.getExtensionImagesArray();
        var _soundTypes = this.getExtensionSoundsArray();
        var acceptTypeString = '';

        _.each(_mainTypes, function(option) {
            acceptTypeString += '.' + option + ',';
        });

        _.each(_soundTypes, function(option) {
            acceptTypeString += '.' + option + ',';
        });

        return acceptTypeString;
    },

    getExtensionImagesArray : function(){
        return this.imagesExtensions;
    },

    getExtensionSoundsArray : function(){
        return this.soundsExtensions;
    }
});