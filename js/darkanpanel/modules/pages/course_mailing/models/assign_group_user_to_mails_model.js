var AssignGroupUsersToMailsModel = PageModel.extend({
    defaults: {
        groupsList : [],
    },

    initialize: function(){
    	this.getData();
    },

    getData: function(){

        var _that = this;

        var request = {
            request: 'getAllGroupsList',
            userType: 'nu'
        };


        DataAccess.lmsRequest(
            {request: JSON.stringify(request)},
            this.onGetDataResult,
            this.onGetDataFault,
            this
        );
    },
});