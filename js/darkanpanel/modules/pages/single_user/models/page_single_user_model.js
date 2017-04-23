var PageSingleUserModel = PageModel.extend({
    defaults: {
        userMail: '',
        username: '',
        limit_exceeded: 0,
        photo: '',
        userCourses: [],
        userId: -1,
        userType: 'app'
    },

    initialize: function(data){

        this.getData(data.userType);

    },

    getData: function(userType){

    	var userId = this.get('userId');

        DataAccess.userStatus(
            {userID: userId, userType: userType},
            this.onGetDataResult,
            this.onGetDataFault,
            this
        );
    },
});