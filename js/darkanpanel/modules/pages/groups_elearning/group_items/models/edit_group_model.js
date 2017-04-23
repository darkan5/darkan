var EditGroupModel = PageModel.extend({
    defaults: {
    	groupData: {
    		name: ''
    	}
    },

    initialize: function(data){
    	this.groupId = data.groupId;
        this.getData();
    },

    getData: function(){

        // get all users
        var getGroupData = {
            request: 'getGroupById',
            groupID: this.groupId,
            userType: 'app'
        };

        DataAccess.lmsRequest(
            {request: JSON.stringify(getGroupData)},
            this.onGetDataResult,
            this.onGetDataFault,
            this
        );

    },
});
