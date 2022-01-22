var FormSubmitComponentView = ExerciseComponentView.extend({

	className : 'component formsubmit-component',

	template: _.template($('#formsubmit-component-template').html()),

    events: function(){
        return _.extend({},ComponentView.prototype.events,{
            'click': 'validateQuestion'
        });
    },

    formFieldsModels: { },

    afterAllInitialized: function() {
		var formFields = this.model.get('formFields')
		this.formFieldsModels = TriggerController.instance.getComponentModelByActionkey(formFields);
    },

    checkAnswers: function() {
		var _that = this;

		var answersStatus = {};
		var answersArray = [ ];


		this.formFieldsModels.each(function(cModel) {

            answersArray.push(cModel.view.validateQuestion());
        });

        var answer = _.indexOf(answersArray, false) == -1;


        return answer;

    },

    resetExerciseApproachSpecial: function(){


        this.formFieldsModels.each(function(cModel) {

            cModel.view.resetExerciseApproach();
        });
        
    },

    renderAsFailed: function() {
        this.$el.css({
            opacity: '.7'
        });

    },

    renderAsCompleted: function() {
        this.$el.css({
            opacity: '.7'
        });
    },

    renderAsReadyToUse: function() {
        this.$el.css({
            opacity: '1'
        });
    },

});