var PageGroupsView = PageView.extend({
    template: '#page-groups-view-template',

    events: {
    	'click .delete-group': 'deleteGroup',
        'click .open-assign-users-window': 'openAssignUsersWindow',
        'hidden.bs.modal #assign-users-window': 'onAssignUsersWindowClose',

        'click .open-add-new-group-window': 'openAddNewGroupWindow',
        'hidden.bs.modal #add-new-group-window': 'onAddNewGroupWindowClose',

        'click .open-edit-group-window': 'openEditGroupWindow',
        'hidden.bs.modal #edit-group-window': 'onEditGroupWindowClose',

        'click .open-assign-group-to-courses-window': 'openAssignGroupToCoursesWindow',
        'hidden.bs.modal #assign-group-to-courses-window': 'onAssignGroupToCoursesWindowClose',

        'click .open-generate-form-window': 'openGenerateFormWindow'

    },

    regions: {
        usersList: '#assignUsersView',
        groupToCourse: '#assignGroupToCourseView',
        addNewGroup: '#addNewGroup',
        editGroup: '#editGroup',
    },

    initialize: function(){
        this.model = new PageGroupsModel();
        this.model.on('change', this.onModelChanged, this);
    },

    

    openGenerateFormWindow: function(e) {
        var _that = this;
        var groupId = parseInt($(e.target).attr('gid'));
        
        var generateFormWindow = this.$el.find('#generate-form-window');

        var modalBody = generateFormWindow.find('.modal-body');

        var form = '<form>\
                        <input type="text" action="http://darkan.eu/adduser?grouid='+ groupId +'" />\
                    </form>';
        

        modalBody.text(form);

    },

    openEditGroupWindow: function(e) {
        var _that = this;
        var groupId = parseInt($(e.target).attr('gid'));
        this.editGroupView = new EditGroupView({groupId:groupId});
        this.editGroup.show(this.editGroupView);
    },

    onEditGroupWindowClose: function() {
        this.model.getData();
    },

    openAssignUsersWindow: function(e) {
        var _that = this;
        var groupId = parseInt($(e.target).attr('gid'));
        this.assignUsersView = new AsignUsersToGroupView({groupId:groupId});
        this.usersList.show(this.assignUsersView);
    },

    onAssignUsersWindowClose: function() {
        this.model.getData();
    },

    openAddNewGroupWindow: function(e) {
        var _that = this;
        var groupId = parseInt($(e.target).attr('gid'));
        this.addNewGroupView = new PageAddGroupView();
        this.addNewGroup.show(this.addNewGroupView);
    },

    onAddNewGroupWindowClose: function() {
        this.model.getData();
    },



    openAssignGroupToCoursesWindow: function(e) {
        var _that = this;
        var groupId = parseInt($(e.target).attr('gid'));
        this.asignGroupToCoursesView = new AsignGroupToCoursesView({groupId:groupId});
        this.groupToCourse.show(this.asignGroupToCoursesView);
    },

    onAssignGroupToCoursesWindowClose: function() {
        this.model.getData();
    },

    

    deleteGroup: function(e) {
    	var _that = this;
    	var groupId = parseInt($(e.target).attr('gid'));

		if (groupId) {
	    	$(e.target).confirmation({
    			title: _lang('delete_group_warning'),
    			btnOkLabel: _lang('yes'),
    			btnCancelLabel: _lang('no'),

	    		onConfirm: function() {
					var request = {
						request: 'deleteGroup',
						groups: [groupId],
                        userType: 'app'
					};

					DataAccess.lmsRequest(
						{request: JSON.stringify(request)},
						function() {
							$(e.target).closest('tr').fadeOut();
                            _Notify(_lang('notify_group_deleted'), 'success');
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
    }
});