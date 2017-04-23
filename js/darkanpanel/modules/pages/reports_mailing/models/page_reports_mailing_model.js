var PageReportsMailingModel = PageModel.extend({
    defaults: {
        usersList : [],
    },

    initialize: function(){

    	this.getData();
    },

    getData: function(){

        var _that = this;

		// var request = {
		// 	request: 'getUsersWhoStartAndNotFinishCourse'
		// };


		// DataAccess.lmsRequest(
		// 	{request: JSON.stringify(request)},
		// 	this.onGetDataResult,
		// 	this.onGetDataFault,
		// 	this
		// );
    },

    
});