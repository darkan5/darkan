var QuizInputTextComponentView = ExerciseComponentView.extend({

	className : 'component quizinputtext-component',

	template: _.template($('#quizinputtext-component-template').html()),

    events: function(){
        return _.extend({},ComponentView.prototype.events,{
            'keyup input': 'changeValue',
            'click': 'focusInput',
        });
    },

    focusInput: function() {

        

        if(Utils.isIOS()){
            //this.$el.find('input').focus().select();
            var value = this.$el.find('input').val();
            this.$el.find('input')[0].setSelectionRange(value.length, 9999);
        }

    },

    afterRender: function() {

        var userSelection = this.model.get('userSelection');
        var defaultValue = this.model.get('defaultValue');

        if (_.isEmpty(userSelection)) {
            this.model.set('userSelection', defaultValue);
        }

        this.renderUserSelection();
        this.formDisabled();
    },

    initUserSelectionObject: function() {
        var userSelection = this.model.get('userSelection');

        _log('this.model quiz select', this.model);

        if (_.isUndefined(userSelection)) {

            userSelection = this.model.get('defaultValue');

            this.model.set('userSelection', userSelection);
        }
    },

    renderUserSelection: function() {
        var userSelection = this.model.get('userSelection');
        this.$el.find('input').val(userSelection);
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

        this.$el.removeClass('mark-questions-as-passed');
        this.$el.removeClass('mark-questions-as-failed');

        this.renderUserSelection();
    },

    formDisabled: function() {
        var compl = this.model.get('compl');

        if (compl != 0)
            this.$el.find('input').attr('disabled', 'disabled');
    },

    formEnabled: function() {
        this.$el.find('input').removeAttr('disabled');
    },

    changeValue: function(e) {

        var input = $(e.target);

    	var value = input.val();
    	this.model.set('userSelection', value);

        this.checkSelfEnter(e);

        if(Utils.isIOS()){
            //input.focus().select();

            this.$el.find('input')[0].setSelectionRange(value.length, 9999);
        }

        
        //input[0].setSelectionRange(length, 9999);
    },

    checkAnswers: function(){

        var userAnswer = this.model.get('userSelection');

        if (!userAnswer) return false;

        if(userAnswer.length > 0){

            var goodAnswers = this.model.get('goodAnswers');


            if(goodAnswers == undefined){
                return true;
            }

            var goodAnswer = goodAnswers.split(';|');

            if (!this.model.get('caseSensitive')) {
                userAnswer = userAnswer.toLowerCase();
                goodAnswer = goodAnswers.toLowerCase().split(';|');
            }

            if (goodAnswer.indexOf(userAnswer) === -1) {
                return false;
            } else {
                return true;

            }
        }

        return false;
    }
});