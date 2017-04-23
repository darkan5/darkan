var DashboardUsersListItemModel = DashboardItemModel.extend({

    defaults: {
        usersList : [],
        usersMailingList : []
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