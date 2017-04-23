var PageAddGroupView = PageView.extend({
    template: '#page-add-group-view-template',

    events: function(){
        return _.extend({},PageView.prototype.events,{
        	'submit #lms-add-group-form': 'createNewGroup'
        });
    },

    initialize: function(){

        this.model = new PageAddGroupModel();
        this.model.on('change', this.onModelChanged, this);
    },

    createNewGroup: function(e) {
    	var _that = this;

        e.preventDefault();

    	var groupName = this.$el.find('.create-group-name').val();

    	if (groupName.length > 0) {
            var request = {
                request: 'addNewGroup',
                groupName: groupName,
                userType: 'app'
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
        $('#add-new-group-window').modal('hide');
        _Notify(_lang('notify_group_added'), 'success');
    },

    onGetDataFault: function() {
        _Notify(_lang('notify_error_occured'), 'danger');
    },

});