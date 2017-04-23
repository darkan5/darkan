var PageCoursesView = PageView.extend({
    template: '#page-courses-view-template',

    initialize: function(){

        this.model = new PageCoursesModel();
        this.model.on('change', this.onModelChanged, this);
    },
    
    regions: {
    	mostPopularChart: '#most-popular-chart',
    	statusChart: '#morris-course-statuses-chart'
    },

    onRender: function() {
    	this.mostPopularChart.show(new DashboardItemChartView({userType: 'all'}));
    	this.statusChart.show(new DashboardItemChartStatusesView({userType: 'all'}));


        this.$el.find('table').DataTable({
            responsive: true,
            "language": {
                "lengthMenu": _lang('lengthMenu'),
                "zeroRecords": _lang('zeroRecords'),
                "info": _lang('info'),
                "infoEmpty": _lang('infoEmpty'),
                "infoFiltered": _lang('infoFiltered'),
                "search":         _lang('search'),
                "paginate": {
                    "first":      _lang('first'),
                    "last":       _lang('last'),
                    "next":       _lang('next'),
                    "previous":   _lang('previous')
                },
            }
        });
    }
});