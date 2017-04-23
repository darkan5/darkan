var CertificatesPageGroupsView = PageView.extend({
    template: '#certificates-page-groups-view-template',

    events: {

    },

    regions: {
        // usersList: '#assignUsersView',
        // addNewGroup: '#addNewGroup',
        // editGroup: '#editGroup',
    },

    initialize: function(){
        this.model = new CerificatesPageGroupsModel();
        this.model.on('change', this.onModelChanged, this);
    },

});