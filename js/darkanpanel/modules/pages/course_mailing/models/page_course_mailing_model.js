var PageCourseMailingModel = PageModel.extend({
    defaults: {
        users : [],
        courseName: '',
        courseUsers: [],
        courseId: 0,
        courseLink: '',
        thumb: ''
    },

    initialize: function(){

    	this.getData();
    },

    getData: function(){

        var _that = this;

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