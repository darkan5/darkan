var PageCreateGrourMailingView = PageView.extend({

    templateOption1: '#page-create-group-view-mailing-option-1-template',
    templateOption2: '#page-create-group-view-mailing-option-2-template',

    state : "0",

    events: {
        'submit .add-user-form': 'onUsersToGroup',
        'click input[name="groupname_select_option"]': 'changeOption',
    },

    initialize: function(data){

    	this.singleCourseModel = data.model;


        //this.userList = {};
        this.model = new PageCreateGroupMailingModel();
        this.model.on('change', this.onModelChanged, this);

        this.template = this.templateOption1;
    },

    onUsersToGroup: function(e){
        e.preventDefault();

    	_log('onUsersToGroup', this.singleCourseModel);


        var groupName = "";
    	var addToExistingGroup = false;

        switch(this.state){
    		case "0" :
    			groupName = this.$el.find('.group-name-input').val();
    			break;

    		case "1" :
    			groupName = this.$el.find('.create-group-select option:selected').text();
                addToExistingGroup = true;
    			break;
    	}

        var courseUsers = this.singleCourseModel.get('courseUsers');


        var usersFromMailing = _.where(courseUsers, {from: "mailing"});

        var users = _.pluck(usersFromMailing, "userID");

        if(groupName == ""){
            _Notify(_lang('notify_error_create_group_no_group_name'), 'danger');
            return;
        }

        if(users.length == 0){
            _Notify(_lang('notify_error_create_group_no_users'), 'danger');
            return;
        }

        _log('groupName', groupName);


        var request = {
            request: 'createGroup',
            userType: 'mailing',
            groupName:groupName,
            users:users,
            addToExistingGroup:addToExistingGroup
        };

        DataAccess.lmsRequest(
            {request: JSON.stringify(request)},
            this.onGetDataResult,
            this.onGetDataFault,
            this
        );


    },

    onGetDataResult: function(data) {

        try {
            data = JSON.parse(data);

 

            if(data.groupCreateed == false){

                if(data.groupExists){
                    _Notify(_lang('notify_error_create_group_group_exist'), 'danger');
                }else{
                    _Notify(_lang('notify_error_create_group_no_created'), 'danger');
                }

                
            }else{

                 _Notify(_lang('notify_create_group_success'), 'success');
                $('#create-mailing-group-window').modal('hide');

                 //$('#create-mailing-group-window').modal.close();
            }


            
        } catch(e) { }
    },

    onGetDataFault: function(data) {
        _Notify(_lang('notify_error_occured'), 'danger');
    },

    onModelChanged: function(){

        this.render();
    },

    changeOption: function(e){

    	var value = $(e.target).val();

    	this.state = value;


    	switch(value){
    		case "0" :
    			this.template = this.templateOption1;
    			break;

    		case "1" :
    			this.template = this.templateOption2;
    			break;
    	}

        this.render();
    },

});