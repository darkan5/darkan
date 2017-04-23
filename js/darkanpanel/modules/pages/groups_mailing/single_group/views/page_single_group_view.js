var PageSingleGroupMailingView = PageView.extend({
    template: '#page-single-group-mailing-template',

    regions: {
//        singleCourseList: '#single-course-list',
//        singleCourseChart: '#single-course-chart'

    },

    initialize: function(data){

        this.model = new PageSingleGroupMailingModel(data);
        this.model.on('change', this.onModelChanged, this);
    },

    onRender: function() {
//        this.singleCourseList.show(new SingleCourseItemListView( this.model.toJSON() ));
//        this.singleCourseChart.show(new SingleCourseItemChartView( this.model.toJSON() ));
    }

});