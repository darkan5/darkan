var FormCheckboxModel = ComponentModel.extend({

	defaults: function(){
      return _.extend({}, ComponentModel.prototype.defaults(),
         {
         	type:"form-checkbox",
         	action: 99,
         	width : 320,
	    	   height : 25,
            contents: '<span style="font-size:18px">'+_lang('SIMPLETEXT_INSERTTEXT')+'</span>',
	    	   inputSize: 25,
            correctValue: false,
            defaultValue: false,
            groupName: 'default',
            checkSelf: false,
            scoreSuccess: 0,
            scoreFail: 0,
            scoreBadAnswer: 0,
            feedbackGood: _lang('FEEDBACK_GOOD_DEFAULT'),
            feedbackBad: _lang('FEEDBACK_BAD_DEFAULT'),
            feedbackShow: false,
            reportName: ''
         }
       )
   }
});