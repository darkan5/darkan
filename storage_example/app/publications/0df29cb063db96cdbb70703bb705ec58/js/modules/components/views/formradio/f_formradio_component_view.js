var FormRadioComponentView = ExerciseComponentView.extend({

	className : 'component formradio-component',

	template: _.template($('#formradio-component-template').html()),

    events: function(){
        return _.extend({},ComponentView.prototype.events,{
            'change input': 'changeValue',
            'deselect': 'saveUserSelection'
        });
    },

    initUserSelectionObject: function() {
        var userSelection = this.model.get('userSelection');

        if (_.isUndefined(userSelection)) {
            
            this.model.set('userSelection', this.model.get('defaultValue'));
        }
    },
    
    afterRender: function() {
        // var defaultValue = this.model.get('defaultValue');
        // this.model.set('userSelection', defaultValue);
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

    formDisabled: function() {
        var compl = this.model.get('compl');

        if (compl != 0)
            this.$el.find('input').attr('disabled', 'disabled');
        
    },

    formEnabled: function() {

        this.$el.find('input').removeAttr('disabled');
    },

    saveUserSelection: function() {
    	var value = this.$el.find('input').prop('checked');
    	this.model.set('userSelection', value);
    },

    changeValue: function(e) {
    	var groupName = this.model.get('groupName');
    	$('#stage-content input[type="radio"][name="'+groupName+'"]').each(function() {
    		$(this).trigger('deselect');
    	});

        this.checkSelf(e);
    },

    selectOrDeselectInputOnScreen: function() {
        this.$el.find('input[type="radio"]').
                                prop('checked', this.model.get('defaultValue'));
    },

    checkAnswers: function(){

        var isRequired = this.model.get('correctValue');
        var userAnswer = this.model.get('userSelection');

        if (_.isUndefined(userAnswer)) return false;

        if (isRequired === userAnswer) {
            return true;
        } else {
            return false;
        }
    },

    renderAsFailed: function() {
        this.formDisabled();
    },

    renderAsCompleted: function() {
        this.formDisabled();
    },


    renderAsReadyToUse: function() {
        this.formEnabled();
    },

});