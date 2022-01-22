var QuizSelectComponentView = ExerciseComponentView.extend({

	className : 'component quizselect-component',

	template: _.template($('#quizselect-component-template').html()),

    events: function(){
        return _.extend({},ComponentView.prototype.events,{
            'change select': 'changeValue',
            'focusin select': 'focusIn'
        });
    },

    afterRender: function() {
        var value = this.$el.find('select').val();
        // this.model.set('userSelection', value);

        this.renderUserSelection();
        //this.formDisabled();
    },

    initUserSelectionObject: function() {
        var userSelection = this.model.get('userSelection');

        _log('initUserSelectionObject', this.model);

        if (_.isUndefined(userSelection)) {

            var formData = this.model.get('formData');

            if(formData){
               selectOptions = formData.selectOptions;

               var option  = _.first( _.where(selectOptions, {startValue: true}) );

               if(option){

                    var value = option.option;

                    this.model.set('userSelection', value);

                    this.$el.find('select').val(value);
               }
            }
        }
    },

    renderUserSelection: function() {
        var userSelection = this.model.get('userSelection');

        if (!_.isObject(userSelection)) {
            this.$el.find('.form-select').val(userSelection);
        }
    },

    renderAsCompleted: function() {
        this.formDisabled();

        if(this.model.get('markQuestions')){
            this.$el.addClass('mark-questions-as-passed');
        }

        this.renderUserSelection();
    },

    renderAsFailed: function() {
        this.formDisabled();

        if(this.model.get('markQuestions')){
            this.$el.addClass('mark-questions-as-failed');
        }

        this.renderUserSelection();
    },

    renderAsReadyToUse: function() {

        this.formEnabled();

        this.$el.removeClass('mark-questions-passed');
        this.$el.removeClass('mark-questions-failed');


        this.renderUserSelection();

        this.render();
    },

    formDisabled: function() {
        var compl = this.model.get('compl');

        if (compl != 0)
            this.$el.find('select').attr('disabled', 'disabled');
    },

    formEnabled: function() {
        this.$el.find('select').removeAttr('disabled');
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