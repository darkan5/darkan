var PageGroupsMailingModel = PageModel.extend({
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
			request: 'getGroupsList',
            userType: 'mailing'
		};


		DataAccess.lmsRequest(
			{request: JSON.stringify(request)},
			this.onGetDataResult,
			this.onGetDataFault,
			this
		);


		// var request = {
		// 	request: 'addUserToGroup',
		// 	groupID: 4,
		// 	users: [5,6,7]
		// };


		// DataAccess.lmsRequest(
		// 	{request: JSON.stringify(request)},
		// 	this.onGetDataResult,
		// 	this.onGetDataFault,
		// 	this
		// );




		// var request = {
		// 	request: 'deleteGroup',
		// 	groups: [3],
		// };


		// DataAccess.lmsRequest(
		// 	{request: JSON.stringify(request)},
		// 	this.onGetDataResult,
		// 	this.onGetDataFault,
		// 	this
		// );



		// var request = {
		// 	request: 'deleteUsersFromGroup',
		// 	groupID: 4,
		// 	users: [5,7]
		// };


		// DataAccess.lmsRequest(
		// 	{request: JSON.stringify(request)},
		// 	this.onGetDataResult,
		// 	this.onGetDataFault,
		// 	this
		// );
    },

    
});