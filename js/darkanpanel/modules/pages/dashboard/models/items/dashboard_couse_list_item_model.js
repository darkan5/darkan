var DashboardCourseListItemModel = DashboardItemModel.extend({

    defaults: {
        coursesList : []
    },

    initialize: function(){

        this.getData();
    },

    getData: function(){

        var _that = this;

        var request = {
            request: 'getCoursesList'
        };

        DataAccess.lmsRequest(
            {request: JSON.stringify(request)},
            this.onGetDataResult,
            this.onGetDataFault,
            this
        );
    },
});