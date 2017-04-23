var PageSingleUserView = PageView.extend({
    template: '#page-single-user-template',

    regions: {
//        singleCourseList: '#single-course-list',
//        singleCourseChart: '#single-course-chart'

    },

    initialize: function(data){
        this.model = new PageSingleUserModel(data);
        this.model.on('change', this.onModelChanged, this);
    },

    events: {
        'click .remove-attempt': 'removeAttemptClick'
    },

    removeAttemptClick: function(e) {
        var _that = this;
        var attemptId = parseInt($(e.target).attr('aid'));

        if (attemptId) {
            $(e.target).confirmation({
                title: _lang('delete_group_warning'),
                btnOkLabel: _lang('yes'),
                btnCancelLabel: _lang('no'),

                onConfirm: function() {
                    var request = {
                        request: 'deleteAttempt',
                        attempts: [attemptId],
                        userType: 'all'
                    };

                    DataAccess.lmsRequest(
                        {request: JSON.stringify(request)},
                        function(data) {
                            var ret = JSON.parse(data);
                            if (ret.status == "success") {
                                _Notify(_lang('notify_attempt_deleted'), 'success');
                                $(e.target).closest('tr').fadeOut();
                            } else {
                                _Notify(_lang('notify_attempt_not_deleted'), 'danger');
                            }
                        },
                        function() {
                            _Notify(_lang('notify_attempt_not_deleted'), 'danger');
                        },
                        _that
                    );
                }
            });
            $(e.target).confirmation('show')
        }
    },
    

    onRender: function() {
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
    },

});