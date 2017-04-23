var DashboardChartItemModel = DashboardItemModel.extend({

    defaults: {
        coursesList : []
    },

    initialize: function(data){

        this.getData(data);
    },

    getData: function(data){

        var _that = this;
        
        var request = {
            request: 'getCoursesList',
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