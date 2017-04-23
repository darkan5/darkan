var PageUsersMailingView = PageView.extend({
    template: '#page-users-mailing-view-template',

    initialize: function(){

        this.model = new PageUsersMailingModel();
        this.model.on('change', this.onModelChanged, this);
    },

    events: {
        'click .open-add-new-user-window': 'openAddNewUsersWindow',
        'click .removeuser': 'removeUserClick',
        'hidden.bs.modal #add-new-user-window': 'onAddNewUsersWindow',
    },

    regions: {
    	mostPopularChart: '#most-popular-chart',
        statusChart: '#morris-course-statuses-chart',
        addUsers: '#addUsers'
    },

    openAddNewUsersWindow: function(e) {
        var _that = this;
        this.addUsersView = new PageAddUserMailingView();
        this.addUsers.show(this.addUsersView);
    },

    onAddNewUsersWindow: function() {
        this.model.getData();
    },


    removeUserClick: function(e) {
        var _that = this;
        var userId = parseInt($(e.target).attr('uid'));

        if (userId) {
            $(e.target).confirmation({
                title: _lang('delete_group_warning'),
                btnOkLabel: _lang('yes'),
                btnCancelLabel: _lang('no'),

                onConfirm: function() {
                    var request = {
                        request: 'deleteUsers',
                        users: [userId],
                        userType: 'mailing'
                    };

                    DataAccess.lmsRequest(
                        {request: JSON.stringify(request)},
                        function() {
                            $(e.target).closest('tr').fadeOut();
                            _Notify(_lang('notify_user_deleted'), 'success');
                        },
                        function() {
                            _Notify(_lang('notify_error_occured'), 'danger');
                        },
                        _that
                    );
                }
            });
            $(e.target).confirmation('show')
        }
    },
    
    onRender: function() {
    	this.mostPopularChart.show(new DashboardItemChartView({userType: 'mailing'}));
    	this.statusChart.show(new DashboardItemChartStatusesView({userType: 'mailing'}));

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