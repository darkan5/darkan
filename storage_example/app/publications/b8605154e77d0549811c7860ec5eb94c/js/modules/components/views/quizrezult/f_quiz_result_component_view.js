var QuizResultComponentView = TextComponentView.extend({

    className : 'component',

    template: _.template($('#quiz-result-component-template').html()),

    afterInitialize: function(){
    	TriggerController.instance.calculatePrecentScore();
    }

});