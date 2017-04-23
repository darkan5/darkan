var PageSingleCourseView = PageView.extend({
    template: '#page-single-course-template',

    events:{
        'click #download-chart-pivot-table-single-course' : 'downloadChartPivotTableSingleCourse'
    },

    regions: {
        singleCourseList: '#single-course-list',
        singleCourseChart: '#single-course-chart',
        questionsAnalyticsVariables: '#single-course-questions-analytics-variables',
        questionsAnalytics: '#single-course-questions-analytics'
    },

    initialize: function(data){

        this.model = new PageSingleCourseModel(data);
        this.model.on('change', this.onModelChanged, this);
    },

    onRender: function() {
        this.singleCourseList.show(new SingleCourseItemListView( this.model.toJSON() ));
        this.singleCourseChart.show(new SingleCourseItemChartView( this.model.toJSON() ));
        this.questionsAnalyticsVariables.show(new QuestionsAnalyticsVariablesView( this.model.toJSON() ));
        this.questionsAnalytics.show(new QuestionsAnalyticsView( this.model.toJSON() ));
    },

    downloadChartPivotTableSingleCourse: function(){

        var _that = this;

        DataAccess.downloadChartPivotTableSingleCourse(
            {userType: 'all', courseID: this.model.get('courseId')},
            function() {

                _Notify('true', 'success');
            },
            function() {
                _Notify('false', 'danger');
            },
            _that
        );
    }

});