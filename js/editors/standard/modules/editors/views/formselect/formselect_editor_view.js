var FormSelectEditorView = ExerciseEditorView.extend({
	template: _.template($('#formselect-editor-template').html()),

    events: function(){
        return _.extend({},EditorView.prototype.events,{
            'change input[name="fontsize"]' : 'changeFontSize',
            'click .add-new-option' : 'addNewOption',
            'keyup .option-name' : 'changeOptionName',
            'change .option-require' : 'changeRequire',
            'click .option-startvalue' : 'changeStartValue',
            'click .formselect-delete-option': 'deleteOption',
            'click .feedback-good-edit': 'startEditFeedbackGood',
            'click .feedback-bad-edit': 'startEditFeedbackBad',
            'click .feedback-good-save': 'changeFeedbackGood',
            'click .feedback-bad-save': 'changeFeedbackBad'
        });
    },

	bindings: {
  		'input[name="fontsize"]' : 'fontSize',
        'input[name="checkself"]' : 'checkSelf',
        'input[name="feedback-show"]' : 'feedbackShow'
	},

    afterRender: function() {
        this.$el.find('.formselect-answers').sortable({
            update: function() {
                
            }
        });
    },

    deleteOption: function(e) {
        var it = parseInt($(e.target).attr('it'));
        var formData = this.model.get('formData');


        formData.selectOptions.splice(it, 1);

        this.model.set('formData', formData);
        this.model.trigger('change');

        this.render();
        this.model.forceRender();
    },

    changeStartValue: function(e) {
        var it = parseInt($(e.target).attr('it'));

        var formData = this.model.get('formData');

        _.each(formData.selectOptions, function(option, i) {
            if (it === i) {
                formData.selectOptions[i].startValue = true;
            } else {
                formData.selectOptions[i].startValue = false;
            }
        });

        this.model.set('formData', formData);

        this.model.trigger('change');
        this.model.forceRender();
    },

    changeRequire: function(e) {
        var it = parseInt($(e.target).attr('it'));

        var formData = this.model.get('formData');
        formData.selectOptions[it].require = $(e.target).is(':checked');

        this.model.set('formData', formData);

        this.model.trigger('change');
    },

    changeOptionName: function(e) {
        var it = parseInt($(e.target).attr('it'));

        var formData = this.model.get('formData');
        formData.selectOptions[it].option = $(e.target).val();

        this.model.set('formData', formData);

        this.model.trigger('change');
        this.model.forceRender();
    },

    addNewOption: function(e) {
        var newOption = {
            option: _lang('FORM_SELECT_NEWOPTION'),
            require: true,
            startValue: false
        };

        var formData = this.model.get('formData');

        formData.selectOptions.push(newOption);

        this.model.set('formData', formData);

        this.model.trigger('change');

        this.render();
    },

    changeFontSize: function(e) {
        this.model.set('fontSize', $(e.target).val());
        this.model.forceRender();
    }

});