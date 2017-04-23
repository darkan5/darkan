var PageUserInCourseDetailsView = PageView.extend({
    template: '#page-user-in-course-details-view-template',

    regions: {
        userInCourseDetailsList: '#user-in-course-details-list',
        morrisUserInCourseDetailsChart: '#morris-user-in-course-details-chart',
        questionsAnalyticsVariables: '#single-course-questions-analytics-variables',
        questionsAnalytics: '#single-course-questions-analytics'
    },

    events: {
        "click #open-course-preview": 'openCourse'
    },

    openCourse: function() {

        var link =  this.model.get('usersDetailsInCourse').courseLink;
        window.open(link);
    },

    initialize: function(data){

        this.model = new PageUserInCourseDetailsModel(data);
        this.model.on('change', this.onModelChanged, this);



    },

    onRender: function() {
        this.userInCourseDetailsList.show(new UserInCourseItemDetailsView( this.model.toJSON() ));
        this.morrisUserInCourseDetailsChart.show(new UserInCourseItemDetailsChartView( this.model.toJSON() ));
        this.questionsAnalyticsVariables.show(new QuestionsAnalyticsVariablesSingleUserView( this.model.toJSON() ));
        this.questionsAnalytics.show(new QuestionsAnalyticsSingleUserView( this.model.toJSON() ));
    }

});