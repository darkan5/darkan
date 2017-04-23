var CertyficatePageCoursesItemListModel = ItemModel.extend({

    defaults: {
        courseName: '',
        courseUsers: [],
        courseId: 0,
        courseLink: ''
    },

    initialize: function(){

        this.getData();
    },

    getData: function(){

        var courseId = this.get('courseId');

        _log('PageSingleCourseModel courseId', this);

        DataAccess.courseStatus(
            {courseID: courseId},
            this.onGetDataResult,
            this.onGetDataFault,
            this
        );
    },
});