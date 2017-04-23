var CrosswordSettingWindow = WindowView.extend({

    tagName: 'div',
    className : 'window window-view crosswordsettingwindow-view editor-window',

    template: _.template($('#crosswordsettingwindow-template').html()),

    events: function(){
        return _.extend({},WindowView.prototype.events,{

            'click input[name="qcrossword-require-answers-to-all-questions"]': 'changeRequireAnswersToAllQuestions',
            'click input[name="qcrossword-time-limit-checkbox"]': 'changeTimeLimitOption',
            'click input[name="qcrossword-colorize-good-answer"]': 'changeColorizeGoodAnswer',
            'click input[name="qcrossword-colorize-good-word"]': 'changeColorizeGoodWord',
            'click input[name="qcrossword-colorize-crossword-after-write-last-word"]': 'changeColorizeCrosswordAfterWriteLastWord',
            'keyup input[name="qcrossword-min_answers_number"]': 'changeMinAnswersNumber',
            'keyup input[name="qcrossword-time-out"]': 'changeQcrosswordTimeout'

        });
    },


    changeQcrosswordTimeout: function(e) {
        var value = $(e.target).val();

        this.componentModel.set('qcrosswordTimeout', value);
    },

    changeMinAnswersNumber: function(e) {
        var value = $(e.target).val();

        this.componentModel.set('minAnswersNumber', value);
    },

    changeColorizeCrosswordAfterWriteLastWord: function(e) {
        var value = $(e.target).is(':checked');

        this.componentModel.set('colorizeCrosswordAfterWriteLastWord', value);
    },

    changeColorizeGoodWord: function(e) {
        var value = $(e.target).is(':checked');

        this.componentModel.set('colorizeGoodWord', value);
    },

    changeColorizeGoodAnswer: function(e) {
        var value = $(e.target).is(':checked');

        this.componentModel.set('colorizeGoodAnswer', value);
    },

    changeTimeLimitOption: function(e) {
        var value = $(e.target).is(':checked');

        this.componentModel.set('timeLimitOption', value);

        if (value) {
            this.$el.find('input[name="qcrossword-time-out"]').removeAttr('disabled');
        } else {
            this.$el.find('input[name="qcrossword-time-out"]').attr('disabled', '');
        }
    },

    changeRequireAnswersToAllQuestions: function(e) {
        var value = $(e.target).is(':checked');

        this.componentModel.set('requireAnswersToAllQuestions', value);

        if (value) {
            this.$el.find('input[name="qcrossword-min_answers_number"]').attr('disabled', '');
        } else {
            this.$el.find('input[name="qcrossword-min_answers_number"]').removeAttr('disabled');
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