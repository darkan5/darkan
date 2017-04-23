var QuizSelectOneComponentView = ExerciseComponentView.extend({

    className : 'component quiz-component quiz',

    template: _.template($('#quizselectone-component-template').html()),

    events: function(){
        return _.extend({},ComponentView.prototype.events,{
            'click .edit-component-button': 'startEditing',
            'click .answer-remove' : 'answerRemove',
            'click .add-new-answer' : 'addNewAnswer',
            'keyup .answer-input' : 'changeAnswerText',
            'click .mark-as-good-answer': 'checkGoodAnswer'
        });
    },

    addComponentListeners :function(){
        // this.listenTo(this.model, 'change:titleShow', this.renderTitleShow);
        this.listenTo(this.model, 'change:multiselect', this.render);
    },

    checkGoodAnswer: function(e) {
        var it = $(e.target).attr('it');
        var answers = this.model.get('answers');

        _.each(answers, function(option, i) {
            answers[i].goodAnswer = false;
        });

        answers[it].goodAnswer = $(e.target).is(':checked');

        this.model.set('answers', answers);
        this.model.trigger('change');
    },

    changeAnswerText: function(e) {
        var it = $(e.target).attr('it');


        var answers = this.model.get('answers');

        answers[it].text = $(e.target).val();

        this.model.set('answers', answers);
        this.model.trigger('change');
    },

    addNewAnswer: function(e) {
        var answers = this.model.get('answers');
        var incrementQuestion = this.model.get('incrementQuestion');

        var highestTopValue = 0;
        var highestLeftValue = 0;
        _.each(answers, function(answer, i) {
            if (highestTopValue < answer.top){
                highestTopValue = answer.top;
            }
            if (highestLeftValue < answer.left){
                highestLeftValue = answer.left;
            }
        });
        highestTopValue += 30;

        answers['#' + incrementQuestion] = {
            text : _lang('MULTISELECTQUIZ_ANSWER'),
            goodAnswer : false,
            left: highestLeftValue,
            top: highestTopValue,
            choosen: false
        };

        this.model.set({
            answers: answers,
            incrementQuestion: incrementQuestion + 1
        });
        // this.model.trigger('change');

        this.unselect();
        this.render();
        this.startEditing();
    },

    answerRemove: function(e) {
    	var it = $(e.target).attr('it');


    	var answers = this.model.get('answers');

    	delete answers[it];

    	this.model.set('answers', answers);
        this.model.trigger('change');

        if (Object.keys(answers).length === 0) {
            this.addNewAnswer();
        }

        this.unselect();
        this.render();
        this.startEditing();

    },

    startEditing: function() {

        var canEditing = this.checkIfCanEditing();

        if(canEditing == false){
            return;
        }

        var _that = this;

        this.$el.find('.quiz-component-handle').hide();

        var addNewAnswerButton = $('<div class="add-new-answer">'+_lang('QUIZ_INLINE_EDITOR_ADD_ANSWER')+'</div>');
        addNewAnswerButton.appendTo(this.$el);


        var answersObject = this.model.get('answers');

        var answers = this.$el.find('.selectone-block-answer').push();
        var i = 0;
        this.$el.find('.selectone-block-answer').each(function() {
            i++;



            var it = $(this).attr('it');
            var answerData = answersObject[it];

            var checked = answerData.goodAnswer ? 'checked' : '';

            if (i === answers)
            	$(this).hide().parent().append('<input type="radio" '+ checked +' it="' + it + '" class="mark-as-good-answer" name="'+_that.model.get('actionkey')+'"><input class="answer-input block-answer-input" type="text" value="' + $(this).text() + '" it="' + it + '"><div class="answer-remove" it="' + it + '"></div><div class="answer-move"></div>');
            else
                $(this).hide().parent().append('<input type="radio" '+ checked +' it="' + it + '" class="mark-as-good-answer" name="'+_that.model.get('actionkey')+'"><input class="answer-input block-answer-input" type="text" value="' + $(this).text() + '" it="' + it + '"><div class="answer-remove" it="' + it + '"></div><div class="answer-move"></div>');
        });

        this.$el.find('.answer-wrapper').draggable({
            containment: this.$el,
            stop: function() {
                var answers = _that.model.get('answers');

                var it = $(this).find('.selectone-block-answer').attr('it');
            
                answers[it].left =  parseInt($(this).css('left'));
                answers[it].top =  parseInt($(this).css('top'));

                _that.model.set('answers', answers);
                _that.model.trigger('change');
            }
        });
    },

    unselect: function(){
        this.$el.find('.quiz-component-handle').show();

        this.$el.find('.selectone-block-answer').show();
        this.$el.find('.answer-input').remove();
        this.$el.find('.answer-remove').remove();
        this.$el.find('.add-new-answer').remove();
        this.render();
    },

    afterRender: function() {
        if ( this.$el.is('.ui-resizable') ) {
            this.$el.resizable("destroy");
            this.makeResizable();
        }
    }

});

var QuizSelectOneComponentViewNotEditable = ComponentView.createNotEditableComponentClass(QuizSelectOneComponentView);