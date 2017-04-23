var SingleCourseItemListView = PageView.extend({
    template: '#single-course-item-list-template',
    initialize: function(data){

        this.model = new SingleCourseItemListModel(data);
        this.model.on('change', this.onModelChanged, this);

    },

    regions: {
        createGroup: '#create-group',
    },
    
    events: {
        "click #open-course-preview": 'openCourse',
        'click .remove-attempt': 'removeAttemptClick',
        'click #generate-certificate': 'generateCertificate',
        'click #create-mailing-group': 'showMailingGroupWindow',
    },

    showMailingGroupWindow: function(e) {
        this.createGrourMailingView = new PageCreateGrourMailingView({ model:this.model });
        this.createGroup.show(this.createGrourMailingView);
    },

    generateCertificate: function(e) {

        var _that = this;

        _Notify(_lang('notify_generate_certyficate_starting'), 'success');


        var request = {
                request: 'generateCertificate',
                courseID: this.model.get('courseId')
            };

            DataAccess.lmsRequest(
                {request: JSON.stringify(request)},
                function(data) {

                    _log('generateCertificate data', data);

                    var ret = JSON.parse(data);

                    if(ret.responce.status == 'success'){
  
                        _that.showDownloadPopup(ret);

                    }else{
                        _Notify(_lang('notify_generate_certyficate_danger'), 'danger');
                    }
                    
                },
                function() {
                    _Notify(_lang('notify_generate_certyficate_danger'), 'danger');
                },
                _that
            );

    },

    showDownloadPopup:function(data){

        var downloadCertyficateWindow = this.$el.find('#download-certyficate-window');

        _log('data', data);

        var zipFilePath = data.responce.zipFilePath;
        var a = downloadCertyficateWindow.find('#download-certificate-link');
        a.attr('href', zipFilePath); 

        downloadCertyficateWindow.modal();

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

    openCourse: function() {
        var link =  this.model.get('courseLink');
        window.open(link);
    }


});