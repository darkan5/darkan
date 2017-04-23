var SingleCourseItemChartModel = ItemModel.extend({

    defaults: {
        courseName: '',
        courseUsers: [],
        courseId: 0,
        pageTimeSummary: [],
        userTimes : [],
        courseLink: ''
    },

    initialize: function(){

        this.getData();
    },

    getData: function(){

        var courseId = this.get('courseId');

        DataAccess.getUsersPageTimes(
            {courseID: courseId},
            this.onGetDataResult,
            this.onGetDataFault,
            this
        );
    },

});