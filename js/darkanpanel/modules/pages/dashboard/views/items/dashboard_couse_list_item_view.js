var DashboardItemCourseListView = DashboardItemView.extend({

    className: 'dashboard-item',

    template: '#dashboard-item-course-list-template',
    initialize: function(){

        this.model = new DashboardCourseListItemModel();
        this.model.on('change', this.onModelChanged, this);
    },

    onRender: function() {
        this.$el.find('table').DataTable({
            responsive: true,
            info: false,
            infoFiltered: false,
            pagingType: "simple",
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
