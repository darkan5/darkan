var TopMenuViewIPad = TopMenuView.extend({

	setNormalState: function() {
        this.template = _.template($('#top-menu-template-ipad-normal').html());
    },

    setBasicState: function() {
        this.template = _.template($('#top-menu-template-ipad-basic').html());
    },

    setTestDriveState: function() {
        this.template = _.template($('#top-menu-template-ipad-test-drive').html());
    },


});