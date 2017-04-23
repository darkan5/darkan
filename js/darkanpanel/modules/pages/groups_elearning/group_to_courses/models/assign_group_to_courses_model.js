var AssignGroupToCoursesModel = PageModel.extend({
    defaults: {
        coursesList : [],
        coursesInGroup : []
    },

    initialize: function(){
    	this.getData();
    },

    getData: function(){

        var requestGroupUsers = {
            request: 'getCoursesList',
        };
        DataAccess.lmsRequest(
            {request: JSON.stringify(requestGroupUsers)},
            this.onGetDataResult,
            this.onGetDataFault,
            this
        );

        var groupId = this.get('groupId');


        var requestAllUsers = {
            request: 'getAsignedCoursesToGroup',
            groupID: groupId
        };

        DataAccess.lmsRequest(
            {request: JSON.stringify(requestAllUsers)},
            this.onGetDataResult,
            this.onGetDataFault,
            this
        );
    },
});