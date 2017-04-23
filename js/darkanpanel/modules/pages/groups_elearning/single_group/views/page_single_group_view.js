var PageSingleGroupView = PageView.extend({
    template: '#page-single-group-template',

    regions: {
//        singleCourseList: '#single-course-list',
//        singleCourseChart: '#single-course-chart'

    },

    initialize: function(data){

        this.model = new PageSingleGroupModel(data);
        this.model.on('change', this.onModelChanged, this);
    },

    onRender: function() {
//        this.singleCourseList.show(new SingleCourseItemListView( this.model.toJSON() ));
//        this.singleCourseChart.show(new SingleCourseItemChartView( this.model.toJSON() ));
    }

});