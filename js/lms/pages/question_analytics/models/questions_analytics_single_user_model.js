var QuestionsAnalyticsSingleUserModel = ItemModel.extend({

    defaults: {
    },

    initialize: function(data){
        this.getData(data);
    },

    getData: function(data){

        DataAccess.getCourseQuestionsDataByUserId(
            {courseID: this.get('courseId'), userID:this.get('userId'), userType: data.userType},
            this.onGetDataResult,
            this.onGetDataFault,
            this
        );
    },

});