var DashboardCourseItemModel = DashboardItemModel.extend({

    defaults: {
        numberOfUsers: 0,
        maxUsers: 0,
        numberOfCourses: 0,
        maxCourses: 0
    },

    initialize: function(){

        this.getData();
    },

    getData: function(){

        DataAccess.getNumberOfUsersAndCourses(
            {},
            this.onGetDataResult,
            this.onGetDataFault,
            this
        );
    },

});