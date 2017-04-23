var EditGroupMailingView = PageView.extend({
    template: '#page-edit-group-mailing-view-template',

    events: function(){
        return _.extend({},PageView.prototype.events,{
        	'submit #lms-edit-group-form': 'editGroup'
        });
    },

    initialize: function(data){
        this.groupId = data.groupId;

        this.model = new EditGroupMailingModel({groupId: this.groupId});
        this.model.on('change', this.onModelChanged, this);
    },

    editGroup: function(e) {
    	var _that = this;

        e.preventDefault();

    	var groupName = this.$el.find('.edit-group-name').val();

    	if (groupName.length > 0) {
            var request = {
                request: 'editGroup',
                groupName: groupName,
                groupID: this.groupId,
                userType: 'mailing'
            };


            DataAccess.lmsRequest(
                {request: JSON.stringify(request)},
                _that.onGetDataResult,
                _that.onGetDataFault,
                _that
            );
        }

    },

    onGetDataResult: function() {
        $('#edit-group-window').modal('hide');
        _Notify(_lang('notify_edit_success'), 'success');
    },

    onGetDataFault: function() {
        _Notify(_lang('notify_error_occured'), 'danger');
    },

});