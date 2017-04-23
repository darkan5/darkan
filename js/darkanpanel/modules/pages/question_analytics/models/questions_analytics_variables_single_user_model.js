var QuestionsAnalyticsVariablesSingleUserModel = ItemModel.extend({

    defaults: {
        scormdata : [],
        scormDataSummary : {}
    },

    initialize: function(){
        this.getData();
    },

    getData: function(){

        DataAccess.getCourseQuestionsDataByUserId(
            {courseID: this.get('courseId'),  userID:this.get('userId'), userType: 'all'},
            this.onGetDataResult,
            this.onGetDataFault,
            this
        );
    },

});