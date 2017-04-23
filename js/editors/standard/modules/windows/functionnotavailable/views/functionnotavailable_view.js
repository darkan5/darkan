var FunctionNotAvailableWindowView = WindowView.extend({

    tagName: 'div',
    className : 'window function-not-avaiable-window',

    events: function() {
        return _.extend({},WindowView.prototype.events,{
         //    'click .goprobutton': 'openGoProWindow',
        	// 'click .signupbutton': 'openSignUpWindow'
        });
    },

    afterInitialize: function() {
        this.detectState();
    },

    // openGoProWindow: function() {
    //     window.open('http://' + __meta__.serverLink + '/pricing');
    // },

    // openSignUpWindow: function() {
    //     window.open('http://' + __meta__.serverLink + '/auth/login');
    // },

    detectState: function() {

        var state = State.getStateType();

        switch(state){

            case 'normal':
                this.setNormalState();
                break;

            case 'test-drive':
                this.setTestDriveState();
                break;    

            default :
                this.setNormalState();
                break;

        }
    },

    setNormalState: function() {
        this.template = _.template($('#window-function-not-available-template').html());
    },

    setTestDriveState: function() {
        this.template =  _.template($('#window-function-not-available-testdrive-template').html());
    },
    
});