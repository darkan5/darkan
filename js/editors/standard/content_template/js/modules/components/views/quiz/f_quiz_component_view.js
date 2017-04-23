var QuizComponentView = ExerciseComponentView.extend({

    className : 'component quiz-component',

    template: _.template($('#quiz-component-template').html()),

    events: function(){
        return _.extend({},ComponentView.prototype.events,{
            'click .quiz-submit-button' : 'validateQuestion',
            'change .answer-checkbox': 'selectAnswer'
        });
    },

    specialRenderDimentions: function() {
        var _that = this;

        var ratio = this.getSmallerRatio();
        var calculatedFontSize = this.model.get('fontSize') * ratio;
            
        if (!isNaN(calculatedFontSize)) {
            this.$el.find('.answer-wrapper').each(function() {
                var answerId = $(this).find('input').attr('it');
                $(this).css({
                    top: _that.model.get('answers')[answerId].top*ratio + "px",
                    left: _that.model.get('answers')[answerId].left*ratio + "px"
                });
                $(this).find('.answer-text').css({
                    'font-size': calculatedFontSize
                });
                $(this).find('input').css({
                    width: 20*ratio + "px",
                    height: 20*ratio + "px",
                    left: -28*ratio + "px",
                    top: 'calc(50% - ' + (20/2*ratio) + 'px)'
                });

            });


            var submitBtnModel = this.model.get('submitButton');
            this.$el.find('.quiz-submit-button').css({
                'font-size': 13*ratio + "px",
                left: submitBtnModel.left*ratio + "px",
                top: submitBtnModel.top*ratio + "px",
                top: submitBtnModel.top*ratio + "px",
                'padding-left': 25*ratio + "px",
                'padding-right': 25*ratio + "px",
                'padding-top': 7*ratio + "px",
                'padding-bottom': 7*ratio + "px",
            });
        }
    },

    selectAnswer: function(e) {
    	var input = $(e.currentTarget);

    	//var answers = this.model.get('answers');
        var userSelection = this.model.get('userSelection');

        // if (!this.model.get('multiselect')) {
        //     _.each(answers, function(answer) {
        //         answer.choosen = false;
        //     });
        // }

        if (!this.model.get('multiselect')) {
            _.each(userSelection, function(answer) {
                answer.c = false;
            });
        }

        //answers[input.attr('it')].choosen = input.prop('checked');

        if (_.isUndefined(userSelection[input.attr('it')])) {
            //var userAnswer = 
            userSelection[input.attr('it')] = { };
        }

        userSelection[input.attr('it')].c = input.prop('checked');


        //this.model.set('answers', answers);
        this.model.set('userSelection', userSelection);
    },

    applyWcag: function() {
        var _that = this;
        var wcag = this.model.get('wcag');
        if (wcag) {
            var submit = this.$el.find('.quiz-submit-button');
            if (submit.push()) {
                submit.attr('tabindex', --StageView.instance.wcagTabIndex);
            }

            var answers = $(this.$el.find('.answer-wrapper').get().reverse());
            answers.each(function() {
                var input = $(this).find('input');
                input.attr('tabindex', --StageView.instance.wcagTabIndex);
                input.attr('aria-label', input.next().text());
            });
            
            var wcagText = this.model.get('wcagMessage');
            this.$el.attr('aria-label', wcagText);
            this.$el.attr('tabindex', --StageView.instance.wcagTabIndex);
        }
    },

    checkAnswers: function() {
		var success = true;

		var answers = this.model.get('answers');

        var userSelection = this.model.get('userSelection');

		for (var answer in answers) {

			if (userSelection[answer].c !== answers[answer].goodAnswer) {
				success = false;
			}
		}

		return success;
    },

    initUserSelectionObject: function() {
        var userSelection = this.model.get('userSelection');
        var answers = this.model.get('answers');

        if (_.isUndefined(userSelection)) {

            userSelection = {};

            for (var answer in answers) {

                userSelection[answer] = { c:false };
            }

            this.model.set('userSelection', userSelection);
        }

        this.renderUserSelection();
    },

    renderAsFailed: function() {
        this.$el.find('input, .quiz-submit-button').attr('disabled', 'disabled');
        this.$el.find('.quiz-submit-button').css({
            opacity: '.7'
        });

        if(this.model.get('markQuestions')){
            this.$el.addClass('mark-questions-as-failed');
        }
        
        this.renderUserSelection();
    },

    renderAsCompleted: function() {
        this.$el.find('input, .quiz-submit-button').attr('disabled', 'disabled');
        this.$el.find('.quiz-submit-button').css({
            opacity: '.7'
        });

        if(this.model.get('markQuestions')){
            this.$el.addClass('mark-questions-as-passed');
        }

        this.renderUserSelection();
    },

    renderAsReadyToUse: function() {
        this.$el.find('input, .quiz-submit-button').removeAttr('disabled');
        this.$el.find('.quiz-submit-button').css({
            opacity: '1'
        });

        this.$el.removeClass('mark-questions-as-passed');
        this.$el.removeClass('mark-questions-as-failed');

        this.renderUserSelection();
    },

    renderUserSelection: function() {
        var _that = this;
        // var answers = this.model.get('answers');

        var userSelection = this.model.get('userSelection');


        _.each(userSelection, function(answer, it) {
            _that.$el.find('input[it="'+it+'"]').prop('checked', answer.c);
        });
    },


});