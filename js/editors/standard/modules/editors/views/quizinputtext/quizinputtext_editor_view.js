var QuizInputTextEditorView = ExerciseEditorView.extend({
	template: _.template($('#quizinputtext-editor-template').html()),

    events: function(){
        return _.extend({},EditorView.prototype.events,{
            'keyup input[name="placeholder"]': 'changePlaceholder',
            'keyup input[name="defaultvalue"]' : 'changeDefalutValue',
            'keyup input[name="fontsize"]' : 'changeFontSize',
            'keyup input[name="maxlength"]' : 'changeMaxLength',
            'change select[name="textalign"]' : 'changeTextAlign',
            'click .feedback-good-edit': 'startEditFeedbackGood',
            'click .feedback-bad-edit': 'startEditFeedbackBad',
            'click .feedback-good-save': 'changeFeedbackGood',
            'click .feedback-bad-save': 'changeFeedbackBad'
        });
    },

	bindings: {
  		'input[name="placeholder"]': 'placeholder',
  		'input[name="defaultvalue"]' : 'defaultValue',
  		'input[name="fontsize"]' : 'fontSize',
  		'input[name="maxlength"]' : 'maxLength',
  		'select[name="textalign"]' : 'textAlign',
        'input[name="casesensitive"]' : 'caseSensitive',
        'input[name="checkself"]' : 'checkSelf',
        'input[name="feedback-show"]' : 'feedbackShow',
        'input[name="mark-questions"]' : 'markQuestions'
	},

    updateGoodAnswers: function() {
        this.model.set('goodAnswers', this.goodAnswersInput.val());
    },

    afterRender: function() {
        var _that = this;

        this.goodAnswersInput = this.$el.find('.forminputtext-goodanswers');
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

        this.goodAnswersInput.importTags(this.model.get('goodAnswers'));
    },

    changePlaceholder: function(e) {
    	this.model.set('placeholder', $(e.target).val());
    },

    changeDefalutValue: function(e) {
    	this.model.set('defaultValue', $(e.target).val());
    },

    changeFontSize: function(e) {
    	this.model.set('fontSize', $(e.target).val());
    },

    changeMaxLength: function(e) {
    	var maxLength = parseInt($(e.target).val());
    	var defaultVal = this.model.get('defaultValue');

    	this.model.set('maxLength', maxLength);
    	
    	if (defaultVal.length > maxLength) {
    		this.model.set('defaultValue', defaultVal.substring(0, maxLength));
    	}

    	this.$el.find('input[name="defaultvalue"]').attr('maxLength', maxLength);
    },

    changeTextAlign: function(e) {
    	this.model.set('textAlign', $(e.target).val());
      this.model.forceRender();
    }
});