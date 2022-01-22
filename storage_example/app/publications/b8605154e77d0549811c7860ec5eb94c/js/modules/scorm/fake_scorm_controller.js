var FakeScormController = ScormController.extend({

    cyc: 123,

    initialize: function(data) {

        this.model = data.model;

    },

    saveScorm: function() {
        // To override
    },

    loadScorm: function() {
        this.trigger('on-load-scorm-data');
    }

});