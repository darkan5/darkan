var ProjectsListItemModel = Backbone.Model.extend({
	defaults:{
        date: "",
        date_modification: "",
        dimentions: "",
        external: null,
        last_visit: "",
        name: "",
        project_id: null,
        size: null,
        skin: "",
        status: 0,
        template: null,
        user_id: null,
        version: "",
        fromuser: "",
        pType: ""
	},

    initialize: function() {

    }
});