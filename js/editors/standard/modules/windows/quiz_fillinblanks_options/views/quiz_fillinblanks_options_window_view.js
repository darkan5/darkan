var QuizfillInBlanksOptionsWindowView = WindowView.extend({

    tagName: 'div',
    className : 'window window-quiz-fillinblanks-options-view',

    template: _.template($('#window-quiz-fillinblanks-options-view-template').html()),

    events: function(){
        return _.extend({},WindowView.prototype.events,{
            'click span.tag span': 'changeAnswerStatus'
        });
    },

    afterInitialize: function(data) {
        _log('data', data);
        this.answerData = data.data.answerData;
        this.componentModel = data.data.componentModel;
        this.componentView = data.data.componentView;
        this.answerId = data.data.answerId;
    },

    initTags: function(){
        var _that = this;

        this.goodAnswersInput = this.$el.find('.quizfillinblanks-goodanswers');
        this.goodAnswersInput.val('');
        this.goodAnswersInput.tagsInput({
            defaultText: _lang('FORM_INPUT_ADDTAG'),
            height: 'auto',
            width: 'auto',

            onAddTag: function() {
                _that.updateGoodAnswers();
            }, 
            onRemoveTag: function() {
                _that.updateGoodAnswers();
            }
        });

        var answersAsTags = '';
            _log('this.answerData', this.answerData);

        var possibleAnswers = this.answerData.goodanswers;
        for (var i = 0; i <= possibleAnswers.length - 1; i++) {
            var possibleAnswerObject = possibleAnswers[i];
            answersAsTags += possibleAnswerObject.text + ';|';
        };
        _log('answersAsTags', answersAsTags);

        this.goodAnswersInput.importTags(answersAsTags);

        this.$el.find('.tagsinput').sortable({
            update: function() {
                _that.updateGoodAnswers();
            }, 
            items: "> span.tag"
        });

        this.renderAnswersStatus();

        this.$el.find('.addtaginput input').focus();
    },

    changeAnswerObjectStatus: function(answerText) {
        var possibleAnswers = this.answerData.goodanswers;
        for (var i = 0; i <= possibleAnswers.length - 1; i++) {
            var possibleAnswerObject = possibleAnswers[i];
            if (possibleAnswerObject.text.trim() == answerText) {
                possibleAnswerObject.iscorrect = !possibleAnswerObject.iscorrect;
                this.trigger('answerChange', this.answerData);
                return possibleAnswerObject.iscorrect;
            }
        };
    },

    renderAnswersStatus: function() {

        var possibleAnswers = this.answerData.goodanswers;
        for (var i = 0; i <= possibleAnswers.length - 1; i++) {
            var possibleAnswerObject = possibleAnswers[i];
            var answerText = possibleAnswerObject.text.trim();
            var answerStatus = possibleAnswerObject.iscorrect;


            var color = answerStatus ? '#cde69c' : '#f00';
            var ob = this.$el.find('.tagsinput .tag:contains("'+ answerText +'")');
            if (ob) {
                ob.css({
                    'background-color': color
                }).attr({
                    'iscorrect': answerStatus
                });
            }
        };

    },

    changeAnswerStatus: function(e) {
        var ob = $(e.currentTarget);
        var answerText = ob.text().trim();
        var answerStatus = this.changeAnswerObjectStatus(answerText);

        var color = answerStatus ? '#cde69c' : '#f00';
        ob.parent().css({
            'background-color': color
        }).attr({
            'iscorrect': answerStatus
        });
    },

    getTypedAnswers: function() {
        var tags = this.$el.find('.tagsinput .tag');
        var answersObject = { };
        var iterator = 0;
        tags.each(function(){
            answersObject[iterator] = {
                text: $(this).find('span').text().trim(),
                iscorrect: $(this).find('span').attr('iscorrect')
            };
            iterator++;
        });

        return answersObject;
    },

    updateGoodAnswers: function() {
        _log('this.goodAnswersInput.val()', this.goodAnswersInput.val());

        var typedAnswers = this.getTypedAnswers();

        // var typedAnswers = this.goodAnswersInput.val().split(';|');
        var answersArray = [ ];
        for (var typedAnswer in typedAnswers ) {
            answersArray.push({
                text: typedAnswers[typedAnswer].text,
                iscorrect: typedAnswers[typedAnswer].iscorrect || true
            });
            this.answerData.goodanswers = answersArray;
        };

        if (this.answerData.type == 'select') {
            this.updateHtmlContent(answersArray);
        }

        this.trigger('answerChange', this.answerData);

    },

    updateHtmlContent: function(answersArray) {

        var input = this.componentView.$el.find('[aid="'+ this.answerId +'"]');
        
        var optionsHtml = '';
        for (var i = 0; i <= answersArray.length - 1; i++) {
            var answer = answersArray[i];
            answerText = answer.text;
            optionsHtml += '<option>'+ answerText +'</option>';
        };

        input.html(optionsHtml);
    }

});
