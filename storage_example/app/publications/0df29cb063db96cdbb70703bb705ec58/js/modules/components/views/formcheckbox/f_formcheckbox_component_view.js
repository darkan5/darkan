var FormCheckboxComponentView = ExerciseComponentView.extend({

	className : 'component formcheckbox-component',

	template: _.template($('#formcheckbox-component-template').html()),

    events: function(){
        return _.extend({},ComponentView.prototype.events,{
            'change input': 'changeValue'
        });
    },

    initUserSelectionObject: function() {
        var userSelection = this.model.get('userSelection');

        if (_.isUndefined(userSelection)) {
            
            this.model.set('userSelection', this.model.get('defaultValue'));
        }
    },
    
    afterRender: function() {
        //var defaultValue = this.model.get('defaultValue');
        //this.model.set('userSelection', defaultValue);
        this.selectOrDeselectInputOnScreen();

        this.renderUserSelection();
        this.formDisabled();
    },

    renderUserSelection: function() {
        var userSelection = this.model.get('userSelection');

        if (!_.isObject(userSelection)) {
            this.$el.find('input').prop('checked', userSelection);
        }
    },

    changeValue: function(e) {

    	var value = $(e.currentTarget).prop('checked');
    	this.model.set('userSelection', value);

        this.checkSelf(e);
    },

    formDisabled: function() {
        var compl = this.model.get('compl');

        if (compl != 0)
            this.$el.find('input').attr('disabled', 'disabled');
    },

    formEnabled: function() {

        this.$el.find('input').removeAttr('disabled');
    },

    disabledComponent: function() {
        this.formDisabled();
    },

    selectOrDeselectInputOnScreen: function() {
        this.$el.find('input[type="checkbox"]').
                                prop('checked', this.model.get('defaultValue'));
    },

    checkAnswers: function(){

        // _log('checkAnswers compl', this.model.get('compl'));
        // _log('checkAnswers attempts', this.model.get('attempts'));


        var isRequired = this.model.get('correctValue');
        var userAnswer = this.model.get('userSelection');

        // _log('checkAnswers isRequired', isRequired);
        // _log('checkAnswers userAnswer', userAnswer);

        if (_.isUndefined(userAnswer)) return false;

        if (isRequired == userAnswer) {
            return true;
        } else {
            return false;
        }
    },

    renderAsReadyToUse: function() {
        this.formEnabled();

        this.renderUserSelection();
    },

    lockComponent: function() {
        // this.model.set();

        // this.renderUserSelection();
    },


});