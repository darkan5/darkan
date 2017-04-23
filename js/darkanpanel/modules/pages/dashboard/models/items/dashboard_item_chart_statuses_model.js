var DashboardChartStatusesItemModel = DashboardItemModel.extend({

    defaults: {
        complitionInfo : {}
    },

    initialize: function(data){

        this.getData(data);
    },

    getData: function(data){

        var _that = this;

        var request = {
            request: 'getUsersCompletionInfo',
            userType: data.userType
        };

        DataAccess.lmsRequest(
            {request: JSON.stringify(request)},
            this.onGetDataResult,
            this.onGetDataFault,
            this
        );
    },
});