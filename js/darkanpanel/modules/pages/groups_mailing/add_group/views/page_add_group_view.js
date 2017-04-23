var PageAddGroupMailingView = PageView.extend({
    template: '#page-add-group-mailing-view-template',

    events: function(){
        return _.extend({},PageView.prototype.events,{
        	'submit #lms-add-group-form': 'createNewGroup'
        });
    },

    initialize: function(){

        this.model = new PageAddGroupMailingModel();
        this.model.on('change', this.onModelChanged, this);
    },

    createNewGroup: function(e) {
        e.preventDefault();
        
    	var _that = this;
        
    	var groupName = this.$el.find('.create-group-name').val();
        _log('GROUP NAME', groupName);
        
    	if (groupName.length > 0) {
            var request = {
                request: 'addNewGroup',
                groupName: groupName,
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
        $('#add-new-group-window').modal('hide');
        _Notify(_lang('notify_group_added'), 'success');
    },

    onGetDataFault: function() {
        _Notify(_lang('notify_error_occured'), 'danger');
    },

});