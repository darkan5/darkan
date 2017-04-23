var ShareProjectWindowView = WindowView.extend({

    className : 'window window-share-project-view',

    template: _.template($('#window-share-project-template').html()),


    events: function(){
        return _.extend({},WindowView.prototype.events,{
            'submit .sharing-form' : 'shareProject',
            'click .cancel-share-project': 'close'
        });
    },

    afterInitialize : function(data) {

        var _that = this;

        this.projectModel = data.data.projectModel;

        this.getSharedUsers();

    },

    getSharedUsers: function() {

        var _that = this;

        DataAccess.getShareProjectUsers(
            { project:_that.projectModel.toJSON() },
            function(data){
                _log('getShareProjectUsers', data, _log.dataaccessOutResult);

                if(!data.success){

                    _Notify('Fault');
                    return;
                }

                if(!data.data.users){

                    _Notify('Fault no users');
                    return;
                }

                var users = data.data.users;

                _that.displaySharedUsers(users);

                
            },
            function(data){
                _log('getShareProjectUsers', data, _log.dataaccessOutFault);
            }
        );
    },

    displaySharedUsers: function(users) {

        var shared = users.shared;
        var sharedNoExist = users.sharedNoExist;

        _log('users', users);
        _log('shared', shared);

        var noshares = true;

        var sharedUsersContainer = this.$el.find('.shared-users');
        sharedUsersContainer.html('');

        if(shared && shared.length > 0){

            noshares = false;

            sharedUsersContainer.append('<div class="share-header">'+Lang.get('projects.existingUsersTitle')+'</div>');

            _log('shared', shared);

            for (var i = 0; i < shared.length; i++) {
                var user = shared[i];

                var shareUser = ShareUserFactory.createShareUser(user);
                shareUser.on('unshare-user', this.unshareUser, this);

                _log('shareUser', shareUser);

                sharedUsersContainer.append(shareUser.render().$el);
            };
        }    

        if(sharedNoExist && sharedNoExist.length > 0){

            noshares = false;

            sharedUsersContainer.append('<div class="share-header">'+Lang.get('projects.notExistingUsersTitle')+'</div>');

            for (var i = 0; i < sharedNoExist.length; i++) {
                var user = sharedNoExist[i];

                var shareUser = ShareUserFactory.createShareUser(user);
                shareUser.on('unshare-user', this.unshareUser, this);

                sharedUsersContainer.append(shareUser.render().$el);
            };
        }

        if (noshares) {
            sharedUsersContainer.html('<div class="noshares">' + Lang.get('projects.noShares') + '</div>');
        }
        
            
    },

    unshareUser: function(userModel){

        var _that = this;

        DataAccess.unshareProject(
            { user:userModel.toJSON() },
            function(data){
                _log('unshareProject', data, _log.dataaccessOutResult);

                if(!data.success){

                    _Notify('Fault');
                    return;
                }

                var pType = data.data.pType;

                _that.projectModel.set('pType', pType);

                _that.getSharedUsers();
                
            },
            function(data){
                _log('unshareProject', data, _log.dataaccessOutFault);
            }
        );
    },

    validateEmail: function(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    },

    shareProject : function(e) {

        e.preventDefault();

        var _that = this;

        var email = this.$el.find('.user-email-share').val();

        var validEmailResult = this.validateEmail(email);

        if(!validEmailResult){
            _Notify('Wrong email');
            return;
        }

        DataAccess.shareProject(
            { project:_that.projectModel.toJSON(), email:email },
            function(data){
                _log('shareProject', data, _log.dataaccessOutResult);

                if(!data.success){

                    _Notify('Fault');
                    return;
                }

                var pType = data.data.pType;

                _that.projectModel.set('pType', pType);

                _that.showNotSharedProjectWindow(data.data);

                _that.getSharedUsers();

                _that.$el.find('.user-email-share').val('');
            },
            function(data){
                _log('shareProject', data, _log.dataaccessOutFault);
            }
        );

        this.trigger('on-project-shared', {}, this);

        //this.close();
    },

    showNotSharedProjectWindow:function(data){

        // TO DO: show window

        _log('showNotSharedProjectWindow', data);
    },

    afterRender: function() {
        var _that = this;
        setTimeout(function() {
            _that.$el.find('.user-email-share').focus();
        }, 2);
    }

});