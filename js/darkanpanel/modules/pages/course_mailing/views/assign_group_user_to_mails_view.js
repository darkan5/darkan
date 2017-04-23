var AsignGroupUsersToMailView = PageView.extend({
    template: '#assign-group-user-to-mail-template',

    events: {
        'click .user-to-assign': 'selectUserToAssign',
        'click .assign-users': 'assignSelectedUsers',
        'click .user-assigned': 'deleteUserFromGroup',
        'click .remove-selection': 'removeSelection',
    },

    selectedGroups: [ ],

    initialize: function(data) {

        this.selectedGroups = [ ];

        this.groupId = data.groupId;

        this.model = new AssignGroupUsersToMailsModel({groupId: this.groupId});
        this.model.on('change', this.onModelChanged, this);
    },

    onRender: function() {
        this.selectedGroups = [ ];

        // this.$el.find('table').DataTable({
        //     responsive: true,
        //     info: false,
        //     infoFiltered: false,
        //     pagingType: "simple",
        //     "language": {
        //         "lengthMenu": _lang('lengthMenu'),
        //         "zeroRecords": _lang('zeroRecords'),
        //         "info": _lang('info'),
        //         "infoEmpty": _lang('infoEmpty'),
        //         "infoFiltered": _lang('infoFiltered'),
        //         "search":         _lang('search'),
        //         "paginate": {
        //             "first":      _lang('first'),
        //             "last":       _lang('last'),
        //             "next":       _lang('next'),
        //             "previous":   _lang('previous')
        //         },
        //     }
        // });
    },

    selectUserToAssign: function(e) {
        var clickedRow = $(e.currentTarget);
        //var userId = parseInt(clickedRow.attr('uid'));
        var groupId = clickedRow.attr('groupid');
        var from = clickedRow.attr('from');

        if (groupId) {
            clickedRow.toggleClass('success');

            var exist = false;
            var i = 0;

            for (i; i < this.selectedGroups.length; i++) {
                var selectedGroup = this.selectedGroups[i];
 
                if(selectedGroup.groupId === groupId){
                    exist = true;
                    break;
                }
            };

            if (!exist) {
                this.selectedGroups.push({ groupId:groupId, from:from });
            } else {
                this.selectedGroups.splice(i, 1);
            }
        }

        if (this.selectedGroups.length) {
            this.$el.find('.assign-users').removeClass('disabled');
        } else {
            this.$el.find('.assign-users').addClass('disabled');
        }

    },

    removeSelection: function() {
        this.selectedGroups = [ ];
        this.$el.find('.user-to-assign').removeClass('success');
        this.$el.find('.assign-users').addClass('disabled');
    },

    onGetDataResult: function() {
        //this.model.getData();
    },

    assignSelectedUsers: function() {

        if (this.selectedGroups.length) {


            var selectedGroups = this.selectedGroups;

            _log('selectedGroups', selectedGroups);

            var request = {
                request: 'getUsersFromAllGroups',
                selectedGroups: selectedGroups,
            };

            DataAccess.lmsRequest(
                {request: JSON.stringify(request)},
                this.onGetDataResult,
                this.onGetDataFault,
                this
            );


            
        }
    },

    onGetDataResult: function(data){

        var mailsArray = [];

        _log('onGetDataResult', data, _log.trigger);

        var jsonData = JSON.parse( data );

        var usersInGroup = jsonData.usersInGroup;

        for (var i = 0; i < usersInGroup.length; i++) {
            var groupUsers = usersInGroup[i].groupUsers;
        
            for (var groupUser in groupUsers) {

                var oneGroup =  groupUsers[groupUser];

                mailsArray.push(oneGroup.login);               
            };
        };

    
        this.trigger('assign-selected-mails', mailsArray);
        this.close();
    },

    onGetDataFault: function(data){
        
    },

    close: function(){
        $('#assign-group-users-window').modal('hide');
        this.remove();
    },

    deleteUserFromGroup: function(e) {
        // var clickedRow = $(e.currentTarget);
        // var userId = parseInt(clickedRow.attr('uid'));

        // _log('user: ', userId);
        // _log('this.groupId: ', this.groupId);

        // if (userId) {
        //     var request = {
        //         request: 'deleteUsersFromGroup',
        //         groupID: this.groupId,
        //         users: [userId],
        //         userType: 'mu'
        //     };


        //     DataAccess.lmsRequest(
        //         {request: JSON.stringify(request)},
        //         this.onGetDataResult,
        //         this.onGetDataFault,
        //         this
        //     );
        // }
    }
});