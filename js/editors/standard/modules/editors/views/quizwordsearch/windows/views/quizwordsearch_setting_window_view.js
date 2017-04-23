var QuizWordsearchSettingWindow = WindowView.extend({

    tagName: 'div',
    className : 'window window-view quizwordsearchsettingwindow-view editor-window',

    template: _.template($('#quizwordsearchsettingwindow-template').html()),

    events: function(){
        return _.extend({},WindowView.prototype.events,{

            'click input[name="wordsearch-require-answers-to-all-questions"]': 'changeRequireAnswersToAllQuestions',
            'click input[name="wordsearch-time-limit-checkbox"]': 'changeTimeLimitOption',
            'keyup input[name="wordsearch-min_answers_number"]': 'changeMinAnswersNumber',
            'keyup input[name="wordsearch-time-out"]': 'changeWordsearchTimeout'

        });
    },


    changeWordsearchTimeout: function(e) {
        var value = $(e.target).val();

        this.componentModel.set('wordSearchTimeOut', parseInt(value));
    },

    changeMinAnswersNumber: function(e) {
        var value = $(e.target).val();

        this.componentModel.set('minAnswersNumber', value);
    },

    changeTimeLimitOption: function(e) {
        var value = $(e.target).is(':checked');

        this.componentModel.set('timeLimitOption', value);

        if (value) {
            this.$el.find('input[name="wordsearch-time-out"]').removeAttr('disabled');
        } else {
            this.$el.find('input[name="wordsearch-time-out"]').attr('disabled', '');
        }
    },

    changeRequireAnswersToAllQuestions: function(e) {
        var value = $(e.target).is(':checked');

        this.componentModel.set('requireAnswersToAllQuestions', value);

        if (value) {
            this.$el.find('input[name="wordsearch-min_answers_number"]').attr('disabled', '');
        } else {
            this.$el.find('input[name="wordsearch-min_answers_number"]').removeAttr('disabled');
        }
    },


	initialize: function( data ) {

        this.componentModel = data.componentModel;
        this.windowModel = new WindowModel();
		this.runListeners();
  	},

    afterRender: function() {
        // to override
    },

    runListeners :function(){
        // To overide
    },

    onClose : function(){
    	this.trigger('on-close');
    }
});