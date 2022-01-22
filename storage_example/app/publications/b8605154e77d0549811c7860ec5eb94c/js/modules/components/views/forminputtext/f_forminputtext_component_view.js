var FormInputTextComponentView = ExerciseComponentView.extend({

	className : 'component forminputtext-component',

	template: _.template($('#forminputtext-component-template').html()),

    events: function(){
        return _.extend({},ComponentView.prototype.events,{
            'keyup input': 'changeValue',
            'click': 'focusInput',
        });
    },

    focusInput: function() {

        if(Utils.isIOS()){
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

        if (_.isUndefined(userSelection) ) {
            this.model.set('userSelection', this.model.get('defaultValue'));
        }
    },

    renderUserSelection: function() {
        var userSelection = this.model.get('userSelection');
        this.$el.find('input').val(userSelection);
    },

    disabledComponent: function() {
        this.formDisabled();
    },

    formDisabled: function() {
        var compl = this.model.get('compl');

        if (compl != 0)
            this.$el.find('input').attr('disabled', 'disabled');
    },

    changeValue: function(e) {

    	// var value = $(e.currentTarget).val();
    	// this.model.set('userSelection', value);

        var input = $(e.target);

        var value = input.val();
        this.model.set('userSelection', value);

        this.checkSelfEnter(e);

        if(Utils.isIOS()){
            this.$el.find('input')[0].setSelectionRange(value.length, 9999);
        }

        this.checkSelfEnter(e);
    },

    checkAnswers: function(){

        var userAnswer = this.model.get('userSelection');

        if (!userAnswer) return false;

        if(userAnswer.length > 0){

            var goodAnswers = this.model.get('goodAnswers');


            if(goodAnswers == undefined){
                return true;
            }

            var goodAnswer = goodAnswers.toLowerCase().split(';|');

            if (goodAnswer.indexOf(userAnswer.toLowerCase()) === -1) {
                return false;
            } else {
                return true;

            }
        }

        return false;
    }
});