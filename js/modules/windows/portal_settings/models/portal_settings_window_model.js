var PortalSettingsWindowModel = WindowModel.extend({

	defaults: function(){
      return _.extend({}, WindowModel.prototype.defaults,
         {
         	modal: true,
			draggable : false,
			enableOkButton : true,
			enableCancelButton : true,
			enableNameInput : true,
            state: 0,
            login: 0,
            savemail: 0,
            price: 0,
            max_accounts: 0,
            business: 0,
            paid: 0,
            currency: 'EUR',
            footeron: 1,
            topmenuon: 1,
            skin: 1,
         }
       )
    }
});