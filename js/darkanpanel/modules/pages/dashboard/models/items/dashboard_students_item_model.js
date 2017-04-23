var DashboardStudentsItemModel = DashboardItemModel.extend({

    defaults: {
        numberOfUsers: 0,
        numberOfMailingUsers: 0,
        maxUsers: 0,
        maxMailingUsers: 0,
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