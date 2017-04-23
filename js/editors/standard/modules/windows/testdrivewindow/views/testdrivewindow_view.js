var TestDriveWindowView = WindowView.extend({

    tagName: 'div',
    className : 'window window-test-drive-view',

    template: _.template($('#window-test-drive-template').html()),


    events: {
        'submit .test-drive-form': 'submitTestDriveEmail',
    },


    initialize: function( data ) {

        var _that = this;

        this.windowModel = data.windowModel;

        this.runListeners();

        if(this.getTestDriveAsVisited()){
            //this.close();
        }

    },


    submitTestDriveEmail:function(e){

        var _that = this;

        e.preventDefault();

        var email = $(e.target).find('.test-drive-email-input').val();

        if(!this.isEmail(email)){
            this.$el.find('.error-feedback').text(_lang('emailIsInvalid'));
            return;
        }

        DataAccess.submitTestDriveEmail(
            { email: email },
            function(data) {

                _log('submitTestDriveEmail result: ', data, _log.dataaccessOutResult);

                _that.setTestDriveAsVisited();
                _that.close();

            },
            function(data) { 
                _log('submitTestDriveEmail fault: ', data, _log.dataaccessOutFault);
            }
        );
        
    },

    isEmail: function (email) {
       var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
       return regex.test(email);
    },

    setTestDriveAsVisited: function () {

        Utils.setCookie('testdrive', true, 30);
    },

    getTestDriveAsVisited: function () {

        return Utils.getCookie('testdrive');
    },







    
});