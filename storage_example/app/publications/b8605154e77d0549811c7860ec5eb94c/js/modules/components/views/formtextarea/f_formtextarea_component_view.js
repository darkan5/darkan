var FormTextareaComponentView = ExerciseComponentView.extend({

	className : 'component formtextarea-component',

	template: _.template($('#formtextarea-component-template').html()),

    events: function(){
        return _.extend({},ComponentView.prototype.events,{
            'keyup textarea': 'changeValue',
            'click': 'focusInput',
        });
    },

    focusInput: function() {

        if(Utils.isIOS()){
            // this.$el.find('textarea').focus().select();
            // this.$el.find('textarea')[0].setSelectionRange(0, 9999);

            var value = this.$el.find('textarea').val();
            this.$el.find('textarea')[0].setSelectionRange(value.length, 9999);
        }
    },

    initUserSelectionObject: function() {
        var userSelection = this.model.get('userSelection');

        if (_.isUndefined(userSelection) ) {
            this.model.set('userSelection', this.model.get('defaultValue'));
        }
    },

    afterRender: function() {
        // var defaultValue = this.model.get('defaultValue');
        // this.model.set('userSelection', defaultValue);

        var userSelection = this.model.get('userSelection');
        var defaultValue = this.model.get('defaultValue');

        if (_.isEmpty(userSelection)) {
            this.model.set('userSelection', defaultValue);
        }

        this.renderUserSelection();
        this.formDisabled();
    },

    renderUserSelection: function() {
        var userSelection = this.model.get('userSelection');
        this.$el.find('textarea').val(userSelection);
    },

    disabledComponent: function() {
        this.formDisabled();
    },

    formDisabled: function() {
        var compl = this.model.get('compl');

        if (compl != 0)
            this.$el.find('textarea').attr('disabled', 'disabled');
    },
    
    changeValue: function(e) {

        this.checkSelfEnter(e);

    	// var value = $(e.currentTarget).val();
    	// this.model.set('userSelection', value);

        var input = $(e.target);

        var value = input.val();
        this.model.set('userSelection', value);

        this.checkSelfEnter(e);

        if(Utils.isIOS()){
            //input.focus().select();

            input[0].setSelectionRange(value.length, 9999);
        }

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