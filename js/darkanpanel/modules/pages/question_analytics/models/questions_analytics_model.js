var QuestionsAnalyticsModel = ItemModel.extend({

    defaults: {
    },

    initialize: function(){
        this.getData();
    },

    getData: function(){
        DataAccess.getCourseQuestionsData(
            {courseID: this.get('courseId'), userType: 'all'},
            this.onGetDataResult,
            this.onGetDataFault,
            this
        );
    },

});