var PageAddUserElearningView = PageView.extend({
    template: '#page-add-user-view-elearning-template',

    userList: {},

    nextUserId: 0,

    events: {
        'submit #add-user-form': 'onAddSingleUser',
        'click .removeuser': 'clickToRemoveUserFromList',
        'click .lms-add-account-button': 'submitAndSend',
        'change #import-from-csv': 'onCsvFileSelected',
        'fileselect #import-from-csv': 'importAccountsFromCsv',
    },

    initialize: function(){
        this.userList = {};
        this.model = new PageAddUserElearningModel();
        this.model.on('change', this.onModelChanged, this);
    },

    onModelChanged: function(){

        this.render();
    },

    onCsvFileSelected: function(e) {
        var input = $(e.currentTarget),
        numFiles = input.get(0).files ? input.get(0).files.length : 1,
        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');


        input.trigger('fileselect', [numFiles, label]);
    },

    importAccountsFromCsv: function(e, numFiles, label) {
        var _that = this;

        var data = null;
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function(event) {
            var csvData = event.target.result;
            data = $.csv.toObjects(csvData);
            if (data && data.length > 0) {
                var numberOfImportedUsers = 0;
                _.each(data, function(singleUserData) {
                    if (_that.validateUserData(singleUserData)) {
                        _that.addUser(singleUserData);
                        numberOfImportedUsers++;
                    }
                });
                _Notify(_lang('notify_users_added', [numberOfImportedUsers, data.length]), 'success');
            } else {
                _Notify(_lang('notify_no_data_to_import'), 'danger');
            }
        };
        reader.onerror = function() {
            _Notify(_lang('notify_import_file_error'), 'danger');
        };
    },

    validUserKeys: [
        'mail', 'username'
    ],

    validateUserData: function(userData) {
        var _that = this;
        var valid = true;

        var userKeys = _.keys(userData);
        var validUserKeys = this.validUserKeys;

        _.each(validUserKeys, function(validUserKey) {
            if (userKeys.indexOf(validUserKey) === -1) {
                valid = false;
            }
            if (!_that.validateEmail(userData['mail'])) {
                valid = false;
            }
        });
        _log('ISVALID', valid);
        _log('userData', userData);
        return valid;
    },

    validateEmail: function(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    },

    getUserInputData: function() {
        return {
            mail: this.$el.find('input[name="mail"]').val(),
            username: this.$el.find('input[name="username"]').val()
        }
    },

    clickToRemoveUserFromList: function(e) {
        var btn = $(e.currentTarget);
        var userId = btn.attr('uid');
        this.removeUserFromList(userId);
        btn.closest('.user-to-add').remove();
    },

    onAddSingleUser: function(e) {
        e.preventDefault();
        var userData = this.getUserInputData();
        this.addUser(userData);
    },

    addUser: function(userData) {
        var _that = this;

        if (userData.mail.length > 0) {
            var newUserId = this.addUserToList(userData);
            if (newUserId) {
                var userBlock = $('<li class="user-to-add list-group-item">'+userData.mail+' ('+ userData.username +')<span class="badge removeuser text-danger" uid="'+newUserId+'">X</span></li>');
                this.$el.find('.users-list').append(userBlock);
                this.$el.find('input[name="mail"]').val('');
                this.$el.find('input[name="username"]').val('').focus();
                this.$el.find('.lms-add-account-button').removeClass('disabled');   
            }
        }
    },

    addUserToList: function(userData) {
        // if (!_.findWhere(userData, {mail: userData.mail})) {
            this.nextUserId++;
            this.userList[this.nextUserId] = userData;
            return this.nextUserId;   
        // }
        // return false;
    },

    removeUserFromList: function(userId) {
        delete this.userList[userId];
        if (_.isEmpty(this.userList)) {
            this.$el.find('.lms-add-account-button').addClass('disabled');
        }
    },

    submitAndSend: function() {
        var _that = this;

        var groupsSelect = this.$el.find('.add-user-groups');
        var groupId = groupsSelect.val(); 

        var request = {
            request: 'addUser',
            userData: this.userList,
            userType: this.userType,
            groupId: groupId
        };

        this.$el.find('.lms-add-account-button').val(_lang('add_user_btn_after_click')).addClass('disabled');

        DataAccess.lmsRequest(
            {request: JSON.stringify(request)},
            _that.onGetDataResult,
            _that.onGetDataFault,
            _that
        );
    },

    onGetDataResult: function(data) {
        $('#add-new-user-window').modal('hide');
        try {
            data = JSON.parse(data);
            if (data.addedusers) {
                _Notify(_lang('notify_users_added_to_db', [data.addedusers.length]), 'success');
            }
        } catch(e) { }
    },

    onGetDataFault: function(data) {
        _Notify(_lang('notify_error_occured'), 'danger');
    },

    onShow: function() {
        this.userType = $('#add-new-user-window').attr('usertype');
    },

});