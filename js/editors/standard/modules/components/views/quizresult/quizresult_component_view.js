var QuizResultComponentView = TextComponentView.extend({

    className : 'component text-component quiz-result',

    template: _.template($('#quiz-result-template').html())

//    events: function(){
//        return _.extend({},ComponentView.prototype.events,{
//            'click .edit-component-button': 'startEditing',
//            'click .answer-remove' : 'answerRemove',
//            'click .add-new-answer' : 'addNewAnswer',
//            'keyup .answer-input' : 'changeAnswerText',
//            'click .answer-checkbox' : 'checkGoodAnswer'
//        });
//    },

});

var QuizResultComponentViewNotEditable = ComponentView.createNotEditableComponentClass(QuizResultComponentView);