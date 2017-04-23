var QuizFillInBlanksEditorView = EditorView.extend({
	template: _.template($('#quizfillinblanks-editor-template').html()),

	bindings: {
        '[class="enable-scrollbar"]': 'enable-scrollbar',
        '#text-editor-padding': 'padding'
	},

    events: function(){
        return _.extend({},EditorView.prototype.events,{
            'click input[name="multiselect"]' : 'changeMultiselect',
            'click input[name="feedback-show"]' : 'changeFeedbackShow',
            'click input[name="feedback-sign"]' : 'changeFeedbackSign',
            'click input[name="check-self"]' : 'changecheckSelf',
            // 'click input[name="title-show"]' : 'changeTitleShow',
            'click input[name="button-show"]' : 'changeButtonShow',
            'keyup .feedback-good' : 'changeFeedbackGood',
            'keyup .feedback-bad' : 'changeFeedbackBad',

            'change .enable-scrollbar': 'onEnableScrollbar',
            'click .editor-add-border-button': 'showBorderWindow'
        });
    },

    afterRender: function() {

        var _that = this;

        this.listenTo(this.model, 'change:padding', this.onPaddingChange);
    },

    showBorderWindow: function() {
        this.model.view.addBorder();
    },

	changeFeedbackGood: function(e) {
		this.model.set('feedbackGood', $(e.target).val());
	},

	changeFeedbackBad: function(e) {
		this.model.set('feedbackBad', $(e.target).val());
	},

	changeMultiselect: function(e) {
		if ($(e.target).is(':checked')) {

		} else {
			var iter = 0;
			var answers = this.model.get('answers');

			_.each(answers, function(option, i) {
				if (iter === 0) {
					answers[i].goodAnswer = true;
				} else {
					answers[i].goodAnswer = false;
				}
				iter++;
			});

			this.model.set('answers', answers);
			this.model.trigger('change');
		}

		this.model.set('multiselect', $(e.target).is(':checked'));

		this.render();
	},

	changeFeedbackShow: function(e) {
		this.model.set('feedbackShow', $(e.target).is(':checked'));
	},

	changeFeedbackSign: function(e) {
		this.model.set('feedbackSign', $(e.target).is(':checked'));
	},

	changecheckSelf: function(e) {
		this.model.set('checkSelf', $(e.target).is(':checked'));
	},

	

	// changeTitleShow: function(e) {
	// 	this.model.set('titleShow', $(e.target).is(':checked'));
	// },

	changeButtonShow: function(e) {
		this.model.set('buttonShow', $(e.target).is(':checked'));
	},

	onPaddingChange: function() {
        this.model.view.renderPadding();
    },

    onEnableScrollbar: function(e){

    	var value = $(e.target).prop('checked');
    	this.model.set('enable-scrollbar', value);
    }
});