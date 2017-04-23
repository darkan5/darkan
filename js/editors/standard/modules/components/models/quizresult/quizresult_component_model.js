var QuizResultModel = TextModel.extend({

    defaults: function(){
        return _.extend({}, ComponentModel.prototype.defaults(),
        {
            type:"quiz-result",
            action: 99,
            width : 380,
            height : 120,
            padding: 10,
            contents: '<span style="font-size:18px">'+_lang('_score')+': {%_score%}</span><br><span style="font-size:18px">'+_lang('_maxscore')+': {%_maxscore%}</span><br><span style="font-size:18px">'+_lang('_percentscore')+': {%_percentscore%}%</span>',
            'enable-scrollbar' : false,
            bgcolor: '',
            backgroundColor: '',
            textColor: '',
            feedbackGood: _lang('FEEDBACK_GOOD_DEFAULT'),
            feedbackBad: _lang('FEEDBACK_BAD_DEFAULT'),
            markQuestions : true
        }
        )
    }
});