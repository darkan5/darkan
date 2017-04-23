var CerificatesPageGroupsModel = PageModel.extend({
    defaults: {
        groupsList : [],
        groupName: ''
    },

    initialize: function(){

    	this.getData();
    },

    getData: function(){

        var _that = this;

		var request = {
			request: 'getGroupsList'
		};


		DataAccess.lmsRequest(
			{request: JSON.stringify(request)},
			this.onGetDataResult,
			this.onGetDataFault,
			this
		);

    },

    
});