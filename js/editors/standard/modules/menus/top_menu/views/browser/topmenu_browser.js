var TopMenuViewBrowser = TopMenuView.extend({

	setNormalState: function() {
        this.template = _.template($('#top-menu-template-browser-normal').html());
    },

    setBasicState: function() {
        this.template = _.template($('#top-menu-template-browser-basic').html());
    },

    setTestDriveState: function() {
        this.template = _.template($('#top-menu-template-browser-test-drive').html());

        //this.showTestDriveState();
    },

    


});