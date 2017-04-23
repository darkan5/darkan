var HistoryItemModel = Backbone.Model.extend({

	defaults:function(){
        return {
            id: '',
            action: '',
            login: '',
            date: '',
            params: {},
        }
	},
    

    initialize: function(){

    }
});