var ShareWindowView = WindowView.extend({

    tagName: 'div',
    className : 'window window-share-view',

    template: _.template($('#window-share-template').html()),
    templateNoExistUser: _.template($('#window-share-noexsistuser-template').html()),

    events: function(){
        return _.extend({},WindowView.prototype.events,{
            'click .window-close-button': 'close',
            'click .submit-share-project': 'shareProjectToUser',
            'click .delete-sharing': 'deleteSharedUser',
            // 'click .submit-share-noexists-project': 'shareProjectToNoExistsUser',
            'click .submit-share-project-cancel': 'close',
            'keyup .user-email-share-project': 'keyupCheck'
        });
    },

    keyupCheck: function(e) {
        if (e.keyCode === 13) {
            this.shareProjectToUser();
        }
    },
    runListeners: function() {
        var _that = this;
        this.getSharedUsers(function(data) {
            _that.render(data);
        });
    },

    getSharedUsers: function(callback) {
        DataAccess.getSharedUsers(
            { },
            function(data) {
                var dataToRender = { usersList: data.usersList, winType: 'list' };

                callback(dataToRender);
            },
            function(data) { _log('data', data) }
        );
    },

    afterRender: function() {
    },

    validateEmail: function(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    },

    deleteSharedUser: function(e) {

    	var _that = this;

    	var obj = $(e.target).parent();
    	var exists = obj.attr('exists') === '1' ? true : false;
    	var id = obj.attr('id');

    	DataAccess.deleteSharedUser(
    		{ id: id, exists: exists },
    		function(data) {
                _that.getSharedUsers(function(dataToRender) { _that.render(dataToRender) });
    		},
    		function(data) { _log('data', data) }
    	);

    },

    shareProjectToNoExistsUser: function(userEmail, message) {

    	var _that = this;

    	DataAccess.shareProjectToNoExistsUser(
    		{ userEmail: userEmail, message: message },
    		function(data) {

		        DataAccess.getSharedUsers(
		            { },
		            function(data) {
                        _that.getSharedUsers(function(dataToRender) { _that.render(dataToRender) });
		            },
		            function(data) { _log('data', data) }
		        );
    		},
    		function(data) { _log('data', data) }
    	);
    },

    shareProjectToUser: function(e) {
    	var _that = this;
    	var userEmail = this.$el.find('.user-email-share-project').val();

        if (!this.validateEmail(userEmail)) {
            var input = this.$el.find('.user-email-share-project');
            input.addClass('animated float error');
            input.focus();
            clearTimeout(this.errorTimeout);
            this.errorTimeout = setTimeout(function() {
                input.removeClass('animated float error');
            }, 1000);
            return;
        }


    	DataAccess.shareProjectToUser(
    		{ 
                email: userEmail,
                project: __meta__.projectID   
            },
    		function(data) {

    			// if (data.existsMail) {

                    // var listEl = $('<li>', {
                    //     class: 'shared-user-row', 
                    //     id: data.uid
                    // });

                    // listEl.append($('<div>', {
                    //                     class: 'photo',
                    //                     style: 'background-image:url('+  data.photo + ')'
                    //                 })
                    //             );
                    // listEl.append($('<div>', {
                    //                     class: 'username'
                    //                 }).text(data.mail)
                    //             );
                    // listEl.append($('<div>', {
                    //                     class: 'delete-sharing'
                    //                 })
                    //             );


    				// _that.$el.find('.share-project-users').append(listEl);


                    _that.getSharedUsers(function(dataToRender) { _that.render(dataToRender) });
    			// } else {

       //              var popup = PopupFactory.createStandardPopup( {}, _that );
       //              popup.on('ok-button-click', function(){
       //                  _that.shareProjectToNoExistsUser(userEmail, _that.mailEditor.getData());
       //              });

       //              var popupContent = _that.templateNoExistUser({userEmail: userEmail})

       //              $('body').append(popup.render({title: _lang('SHARE_PROJECT_NOEXIST_POPUP_TITLE'), content: popupContent}).$el);

       //              _that.mailEditor = CKEDITOR.replace( popup.$el.find('.edit-email')[0], { height: '150px', plugins: 'basicstyles,wysiwygarea,toolbar,list,blockquote,fakeobjects,stylescombo,dialogui,dialog,undo,link'});

	      //           // var dataToRender = { usersList: data.usersList, noExistsMail: data.mail, winType: 'noMail' };

	      //           // _that.render(dataToRender);

    			// }

    		},
    		function(data) { _log('data', data) }
    	);
    }
});