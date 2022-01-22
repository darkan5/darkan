var FormSelectComponentView = ExerciseComponentView.extend({

	className : 'component formselect-component',

	template: _.template($('#formselect-component-template').html()),

    events: function(){
        return _.extend({},ComponentView.prototype.events,{
            'change select': 'changeValue',
            'focusin select': 'focusIn'
        });
    },


    initUserSelectionObject: function() {
        var userSelection = this.model.get('userSelection');

        if (_.isUndefined(userSelection) ) {
            var startValue = this.getStartValue();
            this.model.set('userSelection', startValue);
        }
    },


    getStartValue: function() {
        var formData = this.model.get('formData');
        var selectOptions = formData.selectOptions;

        if (selectOptions) {
            for(var option in selectOptions) {
                if (selectOptions[option].startValue) {
                    return selectOptions[option].option;
                }
            }
        }

        return false;
    },

    afterRender: function() {
        var value = this.$el.find('select').val();
        // this.model.set('userSelection', value);

        this.renderUserSelection();
        this.formDisabled();
    },

    renderUserSelection: function() {
        var userSelection = this.model.get('userSelection');

        if (!_.isObject(userSelection)) {
            this.$el.find('.form-select').val(userSelection);
        }
    },

    disabledComponent: function() {
        this.formDisabled();
    },

    formDisabled: function() {
        var compl = this.model.get('compl');

        if (compl != 0)
            this.$el.find('select').attr('disabled', 'disabled');
    },

    changeValue: function(e) {
    	var value = $(e.currentTarget).val();
    	this.model.set('userSelection', value);

        this.checkSelf(e);
    },

    checkAnswers: function(){

        var userAnswer = this.model.get('userSelection');
        var answerData = null;

        if(!_.isString(userAnswer)){
            userAnswer = this.$el.find('select').val();
        }

        _.each(this.model.get('formData').selectOptions, function(answer) {
            if (answer.option == userAnswer) {
                answerData = answer;
            }
        })

        if (answerData != null) {
            if (answerData.require) {
                return true;
            }
        }
        return false;
    }

});