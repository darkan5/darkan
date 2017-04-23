var PageSettingsView = PageView.extend({
    template: '#page-settings-template',

    regions: {

    },

    initialize: function(data){
        this.model = new PageSettingsModel(data);
        this.model.on('change', this.onModelChanged, this);
    },

    events: {
        'change .force-login': 'savePanelSettings',
        'change .only-my-users': 'savePanelSettings',
        'change .paid-portal': 'savePanelSettings',
        'change #portal-price': 'savePanelSettings'
    },

//    bindings: {
//        '.force-login': 'login',
//        '.only-my-users': 'state'
//    },

    savePanelSettings: function() {

        var forceLogin = $('.force-login').prop('checked');
        var onlyMyUsers = $('.only-my-users').prop('checked');
        var paid = $('.paid-portal').prop('checked');
        var price = $('#portal-price').val();

        DataAccess.setPanelSettings(
            {forceLogin: forceLogin, 
                onlyMyUsers:onlyMyUsers, 
                paid:paid, 
                price:price, 
                userType: 'all'},
            function(data){
                _log('saved', data)

                _log('savePanelSettings', this.model.toJSON());
            },
            function(){_log('save failed')},
            this
        );
    },

});