var QuizFillInBlanksComponentView = ExerciseComponentView.extend({

   className : 'component quizfillinblanks-component',

   template: _.template($('#quizfillinblanks-component-template').html()),

    events: function(){
        return _.extend({},ComponentView.prototype.events,{
        	'change select': 'onInputChange',
            'keyup input': 'onInputKeyUp',
        	//'change input': 'onInputChange',
            //'keyup textarea': 'onInputKeyUp',
        	//'change textarea': 'onInputChange',
        });
    },

    saveUserSelectValue: function(choosenAnswer, answerId) {
    	var userSelectionObject = this.model.get('userSelection');
    	userSelectionObject['#'+answerId] = choosenAnswer;
    	this.model.set('userSelection', userSelectionObject);
    },

    renderAsReadyToUse: function() {
        this.renderUserSelection();
    },

    renderAsCompleted: function() {
        this.renderUserSelection();
        this.disableInputs();
    },

    renderAsFailed: function() {
        this.renderUserSelection();
        this.disableInputs();
    },

    disableInputs: function() {
        var answersElements = this.$el.find('[aid]');
        answersElements.each(function() {
            var ob = $(this);
            ob.prop('disabled', true);
        });
    },

    afterRender: function() {
        this.$el.find('[placeholder]').removeAttr('placeholder');
        this.model.set('markQuestions', false);
        this.model.set('feedbackShow', false);
    },

    renderUserSelection: function() {
        var _that = this;
        var userSelectionObject = this.model.get('userSelection');
        _.each(userSelectionObject, function(userSelection, it) {
        	if (userSelection) {
        		var aid = it.substring(1);
        		var input = _that.$el.find('[aid="'+aid+'"]');
        		_that.setInputValue(input, userSelection);
                _that.checkInput(input);
        	}
        });
    },

    getInputType: function(jQueryObject) {
    	if (jQueryObject.is('select')) {
    		return 'select';
    	}
    	
    	if (jQueryObject.is('input')) {
    		return 'input';
    	}
    	
    	if (jQueryObject.is('textarea')) {
    		return 'textarea';
    	}

    	return '';
    },

    setInputValue: function(jQueryObject, value) {
    	var inputType = this.getInputType(jQueryObject);
    	switch(inputType) {
    		case 'select':
        		jQueryObject.find('option').each(function() {
						if($(this).text() == value) {
							$(this).attr('selected', 'selected');
						}                        
					});
    			break;
    		case 'input':
    		case 'textarea':
        		jQueryObject.val(value);
    			break;
    	}
    },

    getCurrentInputValue: function(jQueryObject) {
    	var inputType = this.getInputType(jQueryObject);
    	switch(inputType) {
    		case 'select':
    			return jQueryObject.find(":selected").text();
    			break;
    		case 'input':
    		case 'textarea':
    			return jQueryObject.val();
    			break;
    	}
    	return '';
    },

    checkAnswers: function() {
        var _that = this;
        var success = true;

        var answersElements = this.$el.find('[aid]');
        answersElements.each(function() {
            var ob = $(this);
            if (!_that.checkInput(ob)) {
                success = false;
            }
        });

        return success;
    },

    onInputChange: function(e) {


        if(!this.model.get('checkSelf')){
            return;
        }

        var ob = $(e.currentTarget);
        // var choosenAnswer = this.getCurrentInputValue(ob);
        // var answerId = ob.attr('aid');
        // this.saveUserSelectValue(choosenAnswer, answerId);

        this.checkInput(ob);

        _log('onInputChange', e);
    },

    onInputKeyUp: function(e){

        switch(e.which){
            case 13:

                _log('onInputKeyUp', e);

                this.onInputChange(e);

                break;
        }

    },

    checkInput: function(ob) {
    	// var ob = $(e.currentTarget);
    	var choosenAnswer = this.getCurrentInputValue(ob);
    	var answerId = ob.attr('aid');

    	var inputAnswers = this.model.get('answers');
    	var thisInputAnswers = inputAnswers['#' + answerId];

    	this.saveUserSelectValue(choosenAnswer, answerId);

    	var correct = this.answerIsCorrect(choosenAnswer, thisInputAnswers);

    	var backgroundColor = correct ? '#469E4B' : '#BB3737';

		ob.css({
			'background-color' : backgroundColor,
			color: '#fff'
		});

        return correct;
    },

    answerIsCorrect: function(choosenAnswer, possibleAnswers) {
    	if (choosenAnswer && possibleAnswers && possibleAnswers.goodanswers) {

    		possibleAnswers = possibleAnswers.goodanswers;

    		for (var i = possibleAnswers.length - 1; i >= 0; i--) {
    			var possibleAnswer = possibleAnswers[i];
    			if (possibleAnswer.iscorrect) {
    				if (possibleAnswer.text.toLowerCase() == choosenAnswer.toLowerCase()) {
    					return true;
    				}
    			}
    		};

    	}


    	return false;
    },


});