var PageUsersModel = PageModel.extend({
    defaults: {
        usersList : [],
        usersMailingList : [],
        groupsList : [],
        lmsPaid: true
    },

    initialize: function(){

    	this.getData();
    },

    getData: function(){

        var _that = this;

		var request = {
			request: 'getUsersList'
		};


		DataAccess.lmsRequest(
			{request: JSON.stringify(request)},
			this.onGetDataResult,
			this.onGetDataFault,
			this
		);
    },

    
});