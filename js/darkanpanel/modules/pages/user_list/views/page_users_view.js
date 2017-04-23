var PageUsersView = PageView.extend({
    template: '#page-users-view-template',

    initialize: function(){

        this.model = new PageUsersModel();
        this.model.on('change', this.onModelChanged, this);
    },

    events: {
        'click .open-add-new-user-window': 'openAddNewUsersWindow',
        'hidden.bs.modal #add-new-user-window': 'onAddNewUsersWindow',
        'change .select-user-group' : 'searchGroup',
        'click .edituser' : 'editUserClick',
        'click .save-edit-user' : 'saveEditUser',
        'click .userpayment' : 'openMarkAsPaidWindow',
        'click .save-mark-as-paid' : 'markAsPaid',
        'click .removeuser': 'removeUserClick'
    },

    regions: {
    	mostPopularChart: '#most-popular-chart',
        statusChart: '#morris-course-statuses-chart',
        addUsers: '#addUsers'
    },

    searchGroup: function(e) {

        var value = $(e.target).val();

        var inputSm = this.$el.find('.input-sm');

        inputSm.val(value);
        inputSm.trigger('keyup');

    },

    openAddNewUsersWindow: function(e) {
        var _that = this;
        this.addUsersView = new PageAddUserElearningView();
        this.addUsers.show(this.addUsersView);
    },


    onAddNewUsersWindow: function() {
        this.model.getData();
    },


    openMarkAsPaidWindow: function(e) {
        var _that = this;
        var userId = parseInt($(e.target).attr('uid'));

        var markAsPaidWindow = this.$el.find('#markaspaid-user-window');

        var useridInput = markAsPaidWindow.find('.save-mark-as-paid');
        useridInput.attr('userid', userId);
    },


    markAsPaid: function(e) {
        var _that = this;
        var method = e.currentTarget.dataset.paymethod;
        var userId = parseInt($(e.currentTarget).attr('userid'));


        var request = {
            request: 'markAsPaid',
            userID:userId,
            payMethod:method,
            userType: 'app'
        };

        DataAccess.lmsRequest(
            {request: JSON.stringify(request)},
            function(data) {
                $('#markaspaid-user-window').modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
                // _that.model.trigger('change');
                var jData = JSON.parse(data);


            },
            function() {
                _Notify(_lang('notify_edit_user_danger'), 'danger');
            },
            _that
        );
    },

    editUserClick: function(e) {
        var _that = this;
        var userId = parseInt($(e.target).attr('uid'));
        var userName = $(e.target).attr('uname');
        var userLogin = $(e.target).attr('ulogin');

        var editUserWindow = this.$el.find('#edit-user-window');

        var useridInput = editUserWindow.find('.save-edit-user');
        useridInput.attr('userid', userId);

        var userLoginInput = editUserWindow.find('#userlogin');
        userLoginInput.text(userLogin);

        var userNameInput = editUserWindow.find('#username');
        userNameInput.val(userName);

        this.editButton = $(e.target);
    },

    saveEditUser: function(e) {

        var _that = this;

        var editUserWindow = this.$el.find('#edit-user-window');

        var useridInput = editUserWindow.find('.save-edit-user');
        var userId = parseInt(useridInput.attr('userid'));

        var userNameInput = editUserWindow.find('#username');
        var userName = userNameInput.val();

        var userLoginInput = editUserWindow.find('#userlogin');
        var userLogin = userLoginInput.text();


        var request = {
                    request: 'editUser',
                    userID:userId,
                    userName:userName,
                    userType: 'app'
                };

        DataAccess.lmsRequest(
            {request: JSON.stringify(request)},
            function(data) {

                var jData = JSON.parse(data);

                _log('jData', jData);

                // if(jData.saved == true){


                    editUserWindow.modal('hide');

                    var tr = this.$el.find('table').find('tr[ulogin="'+ userLogin +'"]');

                    var small = tr.find('small');

                    if(userName != ""){
                        small.text('('+ userName +')');
                    }else{
                        small.text('');
                    }

                    this.editButton.attr('uname', userName);

                    _Notify(_lang('notify_edit_user_success'), 'success');

                    
                // }else{
                //     _Notify(_lang('notify_edit_user_danger_no_access'), 'success');
                // }

            },
            function() {
                _Notify(_lang('notify_edit_user_danger'), 'danger');
            },
            _that
        );

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
                        userType: 'app'
                    };

                    DataAccess.lmsRequest(
                        {request: JSON.stringify(request)},
                        function(data) {

                            var jData = JSON.parse(data);

                            _log('jData', jData);

                            //if(jData.userDeleted == true){
                                $(e.target).closest('tr').fadeOut();
                                _Notify(_lang('notify_user_deleted'), 'success');
                            //}else{
                            //    _Notify(_lang('notify_error_no_access'), 'danger');
                            //}

                            
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
        var _that = this;

    	this.mostPopularChart.show(new DashboardItemChartView({userType: 'app'}));
    	this.statusChart.show(new DashboardItemChartStatusesView({userType: 'app'}));

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

        clearTimeout(this.limitWarningTO);
        this.limitWarningTO = setTimeout(function() {
            var limitExceedeUsers = _that.$el.find('.limit-exceeded').push();
            if (limitExceedeUsers > 0) {
                _Notify(_lang('notify_elearning_users_limit_exceeded', [limitExceedeUsers]), 'warning');
            }
        }, 1000);
        
    }
});