var AssignUsersToGroupMailingModel = PageModel.extend({
    defaults: {
        usersList : [],
        groupName: '',
        groupUsers: {},
        usersMailingList: {},
        groupId: -1
    },

    initialize: function(){
    	this.getData();
    },

    getData: function(){

        // get group users
        var groupId = this.get('groupId');

        var requestGroupUsers = {
            request: 'getUsersFromGroup',
            groupID: groupId,
            userType: 'mailing'
        };
        DataAccess.lmsRequest(
            {request: JSON.stringify(requestGroupUsers)},
            this.onGetDataResult,
            this.onGetDataFault,
            this
        );


        // get all users
        var requestAllUsers = {
            request: 'getUsersList'
        };

        DataAccess.lmsRequest(
            {request: JSON.stringify(requestAllUsers)},
            this.onGetDataResult,
            this.onGetDataFault,
            this
        );
    },
});