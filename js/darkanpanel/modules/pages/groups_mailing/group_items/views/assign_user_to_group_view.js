var AsignUsersToGroupMailingView = PageView.extend({
    template: '#assign-user-to-group-mailing-template',

    events: {
        'click .user-to-assign': 'selectUserToAssign',
        'click .assign-users': 'assignSelectedUsers',
        'click .user-assigned': 'deleteUserFromGroup',
        'click .remove-selection': 'removeSelection',
    },

    selectedUsers: [ ],

    initialize: function(data) {

        this.selectedUsers = [ ];

        this.groupId = data.groupId;

        this.model = new AssignUsersToGroupMailingModel({groupId: this.groupId});
        this.model.on('change', this.onModelChanged, this);
    },

    onRender: function() {
        this.selectedUsers = [ ];

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
    },

    selectUserToAssign: function(e) {
        var clickedRow = $(e.currentTarget);
        var userId = parseInt(clickedRow.attr('uid'));

        if (userId) {
            clickedRow.toggleClass('success');

            if (this.selectedUsers.indexOf(userId) === -1) {
                this.selectedUsers.push(userId);
            } else {
                this.selectedUsers.splice(this.selectedUsers.indexOf(userId), 1);
            }
        }

        if (this.selectedUsers.length) {
            this.$el.find('.assign-users').removeClass('disabled');
        } else {
            this.$el.find('.assign-users').addClass('disabled');
        }

    },

    removeSelection: function() {
        this.selectedUsers = [ ];
        this.$el.find('.user-to-assign').removeClass('success');
        this.$el.find('.assign-users').addClass('disabled');
    },

    onGetDataResult: function() {
        this.model.getData();
    },

    assignSelectedUsers: function() {

        if (this.selectedUsers.length) {
            var request = {
                request: 'addUserToGroup',
                groupID: this.groupId,
                users: this.selectedUsers,
                userType: 'mailing'
            };

            DataAccess.lmsRequest(
                {request: JSON.stringify(request)},
                this.onGetDataResult,
                this.onGetDataFault,
                this
            );
        }
    },

    deleteUserFromGroup: function(e) {
        var clickedRow = $(e.currentTarget);
        var userId = parseInt(clickedRow.attr('uid'));

        _log('user: ', userId);
        _log('this.groupId: ', this.groupId);

        if (userId) {
            var request = {
                request: 'deleteUsersFromGroup',
                groupID: this.groupId,
                users: [userId],
                userType: 'mailing'
            };


            DataAccess.lmsRequest(
                {request: JSON.stringify(request)},
                this.onGetDataResult,
                this.onGetDataFault,
                this
            );
        }
    }
});