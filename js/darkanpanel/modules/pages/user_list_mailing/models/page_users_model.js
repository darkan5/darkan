var PageUsersMailingModel = PageModel.extend({
    defaults: {
        usersMailingList : []
    },

    initialize: function(){

    	this.getData();
    },

    getData: function(){

        var _that = this;

		var request = {
			request: 'getUsersList',
            userType: 'mailing'
		};


		DataAccess.lmsRequest(
			{request: JSON.stringify(request)},
			this.onGetDataResult,
			this.onGetDataFault,
			this
		);
    },

    
});