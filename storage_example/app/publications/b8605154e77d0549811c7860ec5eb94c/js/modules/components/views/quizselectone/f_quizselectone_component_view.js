var QuizSelectOneComponentView = ExerciseComponentView.extend({

    className : 'component quiz-component',

    template: _.template($('#quizselectone-component-template').html()),

    events: function(){
        return _.extend({},ComponentView.prototype.events, {
            'click .selectone-block-answer': 'selectAnswer',
            'keyup .selectone-block-answer': 'onKeyUp'
        });
    },

    specialRenderDimentions: function() {
        var _that = this;

        var ratio = this.getSmallerRatio();
        var calculatedFontSize = 20 * ratio;

        _log(_that.model, _that.model.get('answers'));
            
        this.$el.find('.block-answer').each(function() {
            var answerId = $(this).find('.selectone-block-answer').attr('it');
            $(this).css({
                top: _that.model.get('answers')[answerId].top*ratio + "px",
                left: _that.model.get('answers')[answerId].left*ratio + "px",
                'min-width': 250*ratio + "px",
                'max-width': 350*ratio + "px",
            });
            $(this).find('.selectone-block-answer').css({
                'font-size': calculatedFontSize,
                padding: 10*ratio + "px",
            });
        });
    },
 
    onKeyUp: function(e) {
        var el = $(e.currentTarget);
        switch(e.keyCode) {
            case 32:
                this.selectAnswer({currentTarget: el});
                break;
        }
    },

    afterRender: function() {
        this.renderUserSelection();
    },

    applyWcag: function() {
        var _that = this;
        var wcag = this.model.get('wcag');
        if (wcag) {
            
            var answers = $(this.$el.find('.selectone-block-answer').get().reverse());
            answers.each(function() {
                var label = $(this);
                label.attr('tabindex', --StageView.instance.wcagTabIndex);
            });
            
            var wcagText = this.model.get('wcagMessage');
            this.$el.attr('aria-label', wcagText);
            this.$el.attr('tabindex', --StageView.instance.wcagTabIndex);
        }
    },

    selectAnswer: function(e) {
        var _that = this;

        _log('this', this);
        _log('this.model', this.model);

        if (this.model.get('compl') != 0) return;

        var input = $(e.currentTarget);

        var answers = this.model.get('answers');
        var userSelection = this.model.get('userSelection');

        _.each(userSelection, function(answer) {
            answer.choosen = false;
        });

        this.$el.find('.selectone-block-answer').each(function() {
            _that.renderBlockAsNotSelected($(this));
        });

        userSelection[input.attr('it')].choosen = true;

        this.model.set('userSelection', userSelection);

        this.validateQuestion();

        if (answers[input.attr('it')].goodAnswer) {
            this.renderBlockAsGoodAnswer(input);
        } else {
            this.renderBlockAsBadAnswer(input);
        }
    },
    renderBlockAsNotSelected: function(ob) {
        ob.css({
            color: '#000',
            'background-color': '#fff'
        });
    },

    renderBlockAsGoodAnswer: function(ob) {
        ob.css({
            color: '#fff',
            'background-color': '#42B342'
        });
    },
    renderBlockAsBadAnswer: function(ob) {
        ob.css({
            color: '#fff',
            'background-color': '#BB3737'
        });
    },

    checkAnswers: function() {

        var success = true;

        var answers = this.model.get('answers');
        var userSelection = this.model.get('userSelection');

        for (var answer in answers) {
            if (userSelection[answer].choosen !== answers[answer].goodAnswer) {
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

                userSelection[answer] = { choosen:false };
            }

            this.model.set('userSelection', userSelection);
        }
    },

    renderAsFailed: function() {
        this.$el.find('.selectone-block-answer').off('click');
        this.$el.css({
            opacity: '.8'
        });

        if(this.model.get('markQuestions')){
            this.$el.addClass('mark-questions-as-failed');
        }

        this.renderUserSelection();
    },

    renderAsCompleted: function() {
        this.$el.find('.selectone-block-answer').off('click');
        this.$el.css({
            opacity: '.8'
        });

        if(this.model.get('markQuestions')){
            this.$el.addClass('mark-questions-as-passed');
        }


        this.renderUserSelection();
    },

    renderAsReadyToUse: function() {

        var _that = this;

        // this.$el.find('.selectone-block-answer').on('click', this.selectAnswer);
        this.$el.css({
            opacity: '1'
        });

        this.$el.removeClass('mark-questions-as-passed');
        this.$el.removeClass('mark-questions-as-failed');
        
        this.renderUserSelection();
    },

    renderUserSelection: function() {

        var _that = this;
        var answers = this.model.get('answers');
        var userSelection = this.model.get('userSelection');
        _.each(answers, function(answer, it) {
            var answerOnScreen = _that.$el.find('.selectone-block-answer[it="'+it+'"]');
            if (userSelection[it].choosen) {
                if (answer.goodAnswer) {
                    _that.renderBlockAsGoodAnswer(answerOnScreen);
                } else {
                    _that.renderBlockAsBadAnswer(answerOnScreen);
                }   
            }
        });
    },



});