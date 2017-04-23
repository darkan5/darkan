var UserInCourseChartDetailsItemModel = ItemModel.extend({

    defaults: {
        usersDetailsInCourse : {
            data: '',
            page_time: '',
            lesson_location: '',
            user_score: '',
            course_status: '',
            userMail: '',
            create_date: '',
            modify_date: '',
            userType : 'app'
        }
    },

    initialize: function(){

        this.getData();
    },

    getData: function(){

        var userId = this.get('userId');
        var courseId = this.get('courseId');
        var userType = this.get('userType');

        DataAccess.getUsersDetailsInCourse(
            {userID: userId, courseID:courseId, userType:userType},
            this.onGetDataResult,
            this.onGetDataFault,
            this
        );
    },
});