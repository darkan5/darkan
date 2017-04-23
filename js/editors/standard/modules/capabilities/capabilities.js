var Capabilities = Backbone.Model.extend({

	defaults: {
		"login": false,
		"register": false,
		"createProjects": false,
		"haveProjects": false,
		"publish": false,
		"publishOnPrimary": false,
		"hasOwnChannel": false,
		"exportscorm": false,
		"exporthtml5": false,
		"exportpdf": false,
		"importpdf": false,
		"importpsd": false,
		"publishfacebook": false,
		"mailing": false,
		"versioning": false,
		"adminPanel": false
	},


	getCapabilities: function() {
		var _that = this;

        var state = State.getStateType();

        _log('SSTATTETE', state);

        switch(state){

            case 'normal':

				DataAccess.getCapabilities(
					{},
					function(data) {
						_log('getCapabilities data', data);

						for (var item in data) {
							_that.set(item, data[item], {silent:true});
						};

						_that.trigger('change', _that);
						// this.model.set();
					},
					function() {

					}
				);
                break;

            case 'test-drive':
				DataAccess.getCapabilities(
					{},
					function(data) {
						_log('getCapabilities data', data);

						for (var item in data) {
							_that.set(item, false, {silent:true});
						};

						_that.trigger('change', _that);
						// this.model.set();
					},
					function() {

					}
				);
                break;

            default :
                break;

        }
	},

	createParams: function(paramsList){

		for (var i = 0; i < paramsList.length; i++) {
			var param = paramsList[i];

			param.value = this.get(param.name); 
		};

		return paramsList;

	}

	// applyCapabilities: function(cap) {
	// 	TopMenu.instance.applyCapabilities();
	// }


});

Capabilities.getInstance = function (){
	
	return this.instance || (this.instance = new Capabilities());
}