var PageSingleGroupMailingModel = PageModel.extend({
    defaults: {
        groupName: '',
        groupUsers: {},
        groupId: -1
    },

    initialize: function(){


        this.getData();


    },

    getData: function(){

    	var groupId = this.get('groupId');

        var request = {
            request: 'getUsersFromGroup',
            groupID: groupId,
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