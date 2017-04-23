var PageAddUserElearningModel = PageModel.extend({
    defaults: {
    	groupsList: []
    },

    initialize: function(){

        this.getData();
    },

    getData: function(){

    	var _that = this;

		var request = {
			request: 'getGroupsList',
			userType: 'app'
		};


		DataAccess.lmsRequest(
			{request: JSON.stringify(request)},
			this.onGetDataResult,
			this.onGetDataFault,
			this
		);
    },
});
