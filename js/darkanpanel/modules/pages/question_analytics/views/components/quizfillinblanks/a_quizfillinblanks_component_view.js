var QuizFillInBlanksComponentView = ComponentView.extend({

   className : 'component quizfillinblanks-component',

   template: _.template($('#quizfillinblanks-component-template').html()),

    events: function(){
        return _.extend({},ComponentView.prototype.events,{
        });
    },
});