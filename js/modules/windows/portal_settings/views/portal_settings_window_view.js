var PortalSettingsWindowView = WindowView.extend({


    template: _.template($('#window-portal-options-template').html()),
    className : 'window window-view window-portal-options-view',

    events: function(){
        return _.extend({},WindowView.prototype.events,{
            'click .new-folder-name-cancel': 'close',
	    	'change #footeron': 'changePortalSettings',
	    	'change #topmenuon': 'changePortalSettings',
	    	'change #login': 'changePortalSettings',
	    	'change #state': 'changePortalSettings',
	    	'change #paid': 'changePortalSettings',
	    	'change #price': 'changePortalSettings',
	    	'change #currency': 'changePortalSettings',
        });
    },

    bindings: {
    	'#topmenuon': 'topmenuon',
    	'#footeron': 'footeron',
    	'#login': 'login',
    	'#state': 'state',
    	'#paid': 'paid',
    	'#currency': 'currency',
    	'#price': 'price'
    },

    getPortalSettings: function() {
    	var _that = this;
    	var settings = {};
		DataAccess.getPortalSettings(
			{ },
			function(settings) {
				// _Notify(Lang.get('portal.settings_callback_success'), 'success');
				settings = settings.data.portalsettings;


				for (var setting in settings) {
					if (settings[setting] == 1 || settings[setting] == 0) {
						_that.model.set(setting, settings[setting] == 1 ? true : false);
					} else {
						_that.model.set(setting, settings[setting]);
					}
					
				}
				
			},
			function(err) {
				// _Notify(Lang.get('portal.settings_callback_error'), 'danger');
			}
		);
    },

    afterRender: function() {
    	this.unstickit();
    	this.stickit();
    },

    afterInitialize : function(data) {
        this.model = data.windowModel;
        this.getPortalSettings();
    },

    getRenderData: function() {
        return this.model.toJSON();
    },


    changePortalSettings: function(e) {
    	var settingId = $(e.target).attr('id');
    	var settingType = $(e.target).attr('type');

    	settingValue = this.getSettigValueByType(settingType, $(e.target));

		DataAccess.changePortalSettings(
			{
				settingId: settingId,
				settingValue: settingValue
			},
			function() {
				_Notify(Lang.get('portal.settings_callback_success'), 'success');
			},
			function() {
				_Notify(Lang.get('portal.settings_callback_error'), 'danger');
			}
		);
    },

    getSettigValueByType: function(type, element) {
		switch(type) {
			case 'checkbox':
				return element.prop('checked') ? 1 : 0;
				break;

			case 'number':
			case 'select':
				return element.val();
				break;
		}
		return 0;
    },

});